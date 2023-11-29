package com.example.individuelluppgiftspringboot.service;

import com.example.individuelluppgiftspringboot.dao.FileRepository;
import com.example.individuelluppgiftspringboot.dto.FileUploadResponse;

public class FileService {

    private  final FileRepository fileRepository;


    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

//    public FileUploadResponse uploade(FileUploadResponse fileUploadResponse){
//
//    }
}
