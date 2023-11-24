package com.example.individuelluppgiftspringboot.entities;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
public class FilesUploaded {
    @Id
    @SequenceGenerator(
            name = "files_sequence",
            sequenceName = "files_sequence",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "files_sequence")
    private int id;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private String fileType;
    private String path;
    @Lob
    private byte[] data;

    private String fileDownloadUri;
    private double size;



    public FilesUploaded(String filePath) {
        this.fileName = filePath;
    }
}
