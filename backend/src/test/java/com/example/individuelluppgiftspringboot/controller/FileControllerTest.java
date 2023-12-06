package com.example.individuelluppgiftspringboot.controller;

import com.example.individuelluppgiftspringboot.dao.FileRepository;
import com.example.individuelluppgiftspringboot.dto.FileUploadResponse;
import com.example.individuelluppgiftspringboot.entities.FilesUploaded;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@AutoConfigureDataJpa
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class FileControllerTest {

    @Mock
    private FileRepository fileRepository;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private FileController fileController;

    private AutoCloseable autoCloseable;



    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        }

    @AfterEach
    void tearDown() {
        try {
            autoCloseable.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Test that the controller returns a 400 Bad Request response when the file is empty.

    @Test
    public void testUploadValidFile() throws IOException {
        // Given
        FileController fileController = new FileController(fileRepository, jdbcTemplate);
        String fileName = "test.txt";
        String contentType = "text/plain";
        byte[] data = "Hello, world!".getBytes();
        MultipartFile validFile = new MockMultipartFile(fileName, fileName, contentType, data);

        // When
        FileUploadResponse response = fileController.saveFile(validFile);

        // Then
        assertEquals(fileName, response.getFileName());
        assertEquals(contentType, response.getFileType());
        assertArrayEquals(data, response.getData());
    }



    @Test
    void testSaveFile() throws IOException {
        // Given
        byte[] fileData = "Test file content".getBytes();
        MockMultipartFile mockFile = new MockMultipartFile("file", "test.txt", "text/plain", fileData);

        FilesUploaded filesUploadedEntity = new FilesUploaded();
        filesUploadedEntity.setId(1);
        filesUploadedEntity.setFileName("test.txt");
        filesUploadedEntity.setFileType("text/plain");
        filesUploadedEntity.setData(fileData);
        filesUploadedEntity.setSize(fileData.length);


        // When
        when(fileRepository.save(any(FilesUploaded.class))).thenReturn(filesUploadedEntity);


        // Test
        FileUploadResponse response = fileController.saveFile(mockFile);


        // Then
        assertEquals("test.txt", response.getFileName());
        assertEquals("text/plain", response.getFileType());
        assertArrayEquals(fileData, response.getData());
        verify(fileRepository, times(1)).save(any(FilesUploaded.class));

        System.out.println("response: " + response);
        System.out.println("filesUploadedEntity: " + filesUploadedEntity);
    }


    @Test
    void testDownloadFile() {
        // Given
        long fileId = 1L;
        byte[] fileData = "Test file content".getBytes();

        FilesUploaded filesUploadedEntity = new FilesUploaded();
        filesUploadedEntity.setId((int) fileId);
        filesUploadedEntity.setFileName("test.txt");
        filesUploadedEntity.setFileType("text/plain");
        filesUploadedEntity.setData(fileData);
        filesUploadedEntity.setSize(fileData.length);

        HttpHeaders expectedHeaders = new HttpHeaders();
        expectedHeaders.setContentType(MediaType.parseMediaType("text/plain"));
        expectedHeaders.setContentDisposition(ContentDisposition.attachment().filename("test.txt").build());
        expectedHeaders.setCacheControl("max-age=0");

        // When
        when(jdbcTemplate.queryForObject(anyString(), (Object[]) any(), (RowMapper<Object>) any())).thenReturn(filesUploadedEntity);

        // Test
        ResponseEntity<byte[]> responseEntity = fileController.downloadFile(fileId);

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertArrayEquals(fileData, responseEntity.getBody());
        assertEquals(expectedHeaders, responseEntity.getHeaders());
        verify(jdbcTemplate, times(1)).queryForObject(anyString(), (Object[]) any(), (RowMapper<Object>) any());
    }

    @Test
    void testDownloadFileNotFound() {
        // Given
        long fileId = 1L;

        // When
        when(jdbcTemplate.queryForObject(anyString(), (Object[]) any(), (RowMapper<Object>) any())).thenReturn(null);

        // When
        ResponseEntity<byte[]> responseEntity = fileController.downloadFile(fileId);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertNull(responseEntity.getBody());
        verify(jdbcTemplate, times(1)).queryForObject(anyString(), (Object[]) any(), (RowMapper<Object>) any());
    }

    // Add more tests for other scenarios
}
