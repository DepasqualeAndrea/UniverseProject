package BackEnd.CapstoneProject.User;

import java.util.UUID;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class UserDto {
	private UUID userId;
    private String nome;
    private String cognome;
    private String username;
    private String email;
    private String bio;
    private String genere;
    private String profileImageUrl;
}
