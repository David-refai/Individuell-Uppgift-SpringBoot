package com.example.individuelluppgiftspringboot.dto;


import lombok.Data;

@Data
public class FileUploadResponse {
    private int id;
    private String fileName;
    private String fileType;
    private long size;

    public FileUploadResponse(String fileName, String fileType, long size, int id) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.size = size;
        this.id = id;
    }

    public FileUploadResponse() {
    }
}
