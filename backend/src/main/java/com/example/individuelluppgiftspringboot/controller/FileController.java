package com.example.individuelluppgiftspringboot.controller;



import com.example.individuelluppgiftspringboot.dao.FileRepository;
import com.example.individuelluppgiftspringboot.dto.FileUploadResponse;
import com.example.individuelluppgiftspringboot.entities.FilesUploaded;
import com.example.individuelluppgiftspringboot.exception.NotFoundFileException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

import java.util.Optional;

import static org.springframework.web.servlet.function.ServerResponse.status;

@RestController
@RequestMapping("/api/v1/file")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    private final FileRepository fileRepository;
    private final JdbcTemplate jdbcTemplate;
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);


    public FileController(FileRepository fileRepository, JdbcTemplate jdbcTemplate) {
        this.fileRepository = fileRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestPart("file") MultipartFile file)

    {
        try {
            if (file.isEmpty()) {
                return new ResponseEntity<>("Uploaded file is empty", HttpStatus.BAD_REQUEST);
            }
            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            byte[] data = file.getBytes();


            // Create and save FilesUploaded entity
            FilesUploaded filesUploadedEntity = new FilesUploaded();
            filesUploadedEntity.setFileName(fileName);
            filesUploadedEntity.setFileType(contentType);
            filesUploadedEntity.setData(data);
                filesUploadedEntity.setSize(file.getSize());

//            fileRepository.save(filesUploadedEntity);
            jdbcTemplate.update(
                    "INSERT INTO files_uploaded (file_name, file_type, file_data, file_size) VALUES (?, ?, ?, ?)",
                    filesUploadedEntity.getFileName(),
                    filesUploadedEntity.getFileType(),
                    filesUploadedEntity.getData(),
                    filesUploadedEntity.getSize()

            );

            // Fetch the ID of the newly inserted record
            Long id = jdbcTemplate.queryForObject("SELECT last_insert_rowid()", Long.class);
            filesUploadedEntity.setId(Integer.parseInt(String.valueOf(id)));


            FileUploadResponse response = new FileUploadResponse();
            response.setId(filesUploadedEntity.getId());
            response.setFileName(fileName);
            response.setFileType(contentType);
            response.setData(filesUploadedEntity.getData());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IOException e) {
            logger.error("Error occurred during file upload", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long fileId) {
//        Optional<FilesUploaded> fileOptional = fileRepository.findById(fileId);
        Optional<FilesUploaded> fileOptional = Optional.ofNullable(jdbcTemplate.queryForObject(
                "SELECT * FROM files_uploaded WHERE id = ?",
                new Object[]{fileId},
                (rs, rowNum) ->
                        new FilesUploaded(
                                rs.getInt("id"),
                                rs.getString("file_name"),
                                rs.getString("file_type"),
                                rs.getBytes("file_data"),
                                rs.getDouble("file_size")
                        )
        ));
        if (fileOptional.isEmpty()) {
            fileRepository.deleteById(fileId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        FilesUploaded file = fileOptional.get();
        String fileName = file.getFileName() ;// Retrieve the file name from the database
        String contentType = file.getFileType(); // Retrieve the file type from the database
        byte [] data = file.getData();

        try {


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build());
            headers.setCacheControl("max-age=0");

            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (NotFoundFileException notFoundFileException) {
            throw new NotFoundFileException("File not found with id " + fileId);
      }
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<?> deleteFile(@PathVariable Long fileId) {
        Optional<FilesUploaded> fileOptional = Optional.ofNullable(jdbcTemplate.queryForObject(
                "SELECT * FROM files_uploaded WHERE id = ?",
                new Object[]{fileId},
                (rs, rowNum) ->
                        new FilesUploaded(
                                rs.getInt("id"),
                                rs.getString("file_name"),
                                rs.getString("file_type"),
                                rs.getBytes("file_data"),
                                rs.getDouble("file_size")
                        )
        ));

        try {
            FilesUploaded file = fileOptional.get();
            jdbcTemplate.update(
                    "DELETE FROM files_uploaded WHERE id = ?",
                    file.getId()
            );

//            fileRepository.deleteById(fileId);
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (NotFoundFileException notFoundFileException) {
            throw new NotFoundFileException("File not found with id " + fileId);
        }
    }

    @GetMapping("/file/{fileId}")
    public ResponseEntity<FilesUploaded> getFileById(@PathVariable Long fileId) {
        Optional<FilesUploaded> fileOptional = fileRepository.findById(fileId);
        if (fileOptional.isEmpty()) {
            fileRepository.deleteById(fileId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        FilesUploaded file = fileOptional.get();
        return new ResponseEntity<>(file, HttpStatus.OK);
    }

    @GetMapping("/all")
    public java.util.List<FilesUploaded> getAllFiles() {
//        return fileRepository.findAll();
        return jdbcTemplate.query(
                "SELECT * FROM files_uploaded",
                (rs, rowNum) ->
                        new FilesUploaded(
                                rs.getInt("id"),
                                rs.getString("file_name"),
                                rs.getString("file_type"),
                                rs.getBytes("file_data"),
                                rs.getDouble("file_size")
                        )
        );
    }
}
