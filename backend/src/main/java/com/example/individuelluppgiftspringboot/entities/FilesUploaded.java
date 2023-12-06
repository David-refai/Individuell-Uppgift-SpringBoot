package com.example.individuelluppgiftspringboot.entities;


import com.example.individuelluppgiftspringboot.dto.FileUploadResponse;
import jakarta.persistence.*;
import lombok.*;

import java.util.Arrays;
import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "filesUploaded")
public class FilesUploaded {
    @Id
    @SequenceGenerator(
            name = "files_sequence",
            sequenceName = "files_sequence",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "files_sequence")
    private int id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;
    @Lob
    @Column(name = "file_data")
    private byte[] data;

    @Column(name = "file_size")
    private double size;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        FileUploadResponse other = (FileUploadResponse) obj;
        return Objects.equals(id, other.getId()) &&
                Objects.equals(fileName, other.getFileName()) &&
                Objects.equals(fileType, other.getFileType()) &&
                Arrays.equals(data, other.getData());
    }


}
