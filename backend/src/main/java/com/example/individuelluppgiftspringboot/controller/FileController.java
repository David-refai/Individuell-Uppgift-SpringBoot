package com.example.individuelluppgiftspringboot.controller;


import com.example.individuelluppgiftspringboot.dao.FileRepository;
import com.example.individuelluppgiftspringboot.dto.FileUploadResponse;
import com.example.individuelluppgiftspringboot.entities.FilesUploaded;
import com.example.individuelluppgiftspringboot.exception.NotFoundFileException;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;

import java.nio.file.Files;
import java.util.Optional;

import static org.springframework.web.servlet.function.ServerResponse.status;

@RestController
@RequestMapping("/api/v1/file")
public class FileController {

    private final FileRepository fileRepository;

    public FileController(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestPart("file") MultipartFile file)

    {
        try {
            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            byte[] data = file.getBytes();

            //
            // Save file data to src directory
            String filePath = "/Users/david/Documents/Högskolan/Spring-Boot/Individuell-Uppgift-SpringBoot/backend/src/main/resources/files/";
            String f = filePath + fileName;
            try {
                File uploadfile = new File(filePath);
                if (!uploadfile.exists()) {
                    uploadfile.mkdirs();
                }
                file.transferTo(new File(filePath + fileName));
            } catch (IOException e) {
                e.printStackTrace();
            }

            // Create and save FilesUploaded entity
            FilesUploaded filesUploadedEntity = new FilesUploaded();
            filesUploadedEntity.setFileName(fileName);
            filesUploadedEntity.setFileType(contentType);
            filesUploadedEntity.setPath(f);
            filesUploadedEntity.setData(data);
            filesUploadedEntity.setFileDownloadUri("/api/v1/file/download/" + filesUploadedEntity.getFileName());
//             sent size to database after convert to mb
            double fileSizeInMB = file.getSize() / 1048576.0;
            if (file.getSize() > 1000000) {
        // Convert bytes to megabytes with double precision
                filesUploadedEntity.setSize(Math.round(fileSizeInMB * 100.0) / 100.0);
            } else {
                filesUploadedEntity.setSize(file.getSize());
            }
//            filesUploadedEntity.setSize(file.getSize());
            fileRepository.save(filesUploadedEntity);

            FileUploadResponse response = new FileUploadResponse();
            response.setId(filesUploadedEntity.getId());
            response.setFileName(fileName);
            response.setFileType(contentType);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long fileId) {
        Optional<FilesUploaded> fileOptional = fileRepository.findById(fileId);
        if (fileOptional.isEmpty() || fileOptional.get().getPath() == null) {
            fileRepository.deleteById(fileId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        FilesUploaded file = fileOptional.get();
        String fileName = file.getFileName() ;// Retrieve the file name from the database
        String filePath = file.getPath(); // Retrieve the file path from the database
        String contentType = file.getFileType(); // Retrieve the file type from the database

        // Read file content from the src directory
        File uploadedFile = new File(filePath);

        try {
            byte[] data = Files.readAllBytes(uploadedFile.toPath());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build());
            headers.setCacheControl("max-age=0");

            return new ResponseEntity<>(data, headers, HttpStatus.OK);
        } catch (NotFoundFileException | IOException notFoundFileException) {
            throw new NotFoundFileException("File not found with id " + fileId);
      }
    }

    @GetMapping("/all")
    public java.util.List<FilesUploaded> getAllFiles() {
        return fileRepository.findAll();
    }
}
