package com.example.individuelluppgiftspringboot.dao;

import com.example.individuelluppgiftspringboot.entities.FilesUploaded;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface FileRepository extends JpaRepository<FilesUploaded, Long> {

}
