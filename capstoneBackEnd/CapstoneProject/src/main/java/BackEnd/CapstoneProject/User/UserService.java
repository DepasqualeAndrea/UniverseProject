package BackEnd.CapstoneProject.User;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import BackEnd.CapstoneProject.Cloudinary.CloudinaryService;
import BackEnd.CapstoneProject.Exception.NotFoundException;
import BackEnd.CapstoneProject.Exception.UserNotFoundException;
import BackEnd.CapstoneProject.Payload.UserRequestPayload;
import BackEnd.CapstoneProject.reply.Reply;
import BackEnd.CapstoneProject.reply.ReplyDTO;
import jakarta.transaction.Transactional;

@Service
@Lazy
public class UserService {
	private final UserRepo userRepository;
	private final CloudinaryService cloudinaryService;

	public UserService(UserRepo userRepository, CloudinaryService cloudinaryService) {
		this.userRepository = userRepository;

		this.cloudinaryService = cloudinaryService;
	}

	@Transactional
	public User registerUser(User registrationDTO, MultipartFile image) throws IOException {
		if (image.isEmpty()) {
			throw new IllegalArgumentException("Le immagini non sono state fornite.");
		}

		String imageUrl = cloudinaryService.uploadImage(image);

		User user = new User();
		user.setNome(registrationDTO.getNome());
		user.setCognome(registrationDTO.getCognome());
		user.setUsername(registrationDTO.getUsername());
		user.setEmail(registrationDTO.getEmail());
		user.setPassword(registrationDTO.getPassword());
		user.setRole(Ruolo.USER);
		user.setDataRegistrazione(LocalDateTime.now());
		user.setProfileImageUrl(imageUrl);

		return userRepository.save(user);
	}

	@Transactional
	public User findById(UUID id) throws NotFoundException {
		return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
	}

	@Transactional
	public User findByIdAndUpdate(UUID id, UserRequestPayload body, MultipartFile image) throws NotFoundException, IOException {
	    User found = this.findById(id);

	    if (body.getNome() != null) {
	        found.setNome(body.getNome());
	    }
	    if (body.getCognome() != null) {
	        found.setCognome(body.getCognome());
	    }
	    if (body.getUsername() != null) {
	        found.setUsername(body.getUsername());
	    }
	    if (body.getBio() != null) {
	        found.setBio(body.getBio());
	    }
	    if (body.getCitta() != null) {
	        found.setCitta(body.getCitta());
	    }
	    if (body.getDataDiNascita() != null) {
	        found.setDataDiNascita(body.getDataDiNascita());
	    }
	    if(body.getGenere() != null) {
	    	found.setGenere(body.getGenere());
	    }
	    found.setDataUltimeModifiche(LocalDateTime.now());

	    if (image != null) {
	        String imageUrl = cloudinaryService.uploadImage(image);
	        found.setProfileImageUrl(imageUrl);
	    }

	    return userRepository.save(found);
	}


	public void toggleFollow(UUID followerId, UUID followingId) {
		User follower = userRepository.findById(followerId)
				.orElseThrow(() -> new UserNotFoundException("Follower not found"));
		User following = userRepository.findById(followingId)
				.orElseThrow(() -> new UserNotFoundException("Following user not found"));

		if (following.getFollowing().contains(follower)) {
			following.getFollowing().remove(follower);
		} else {
			following.getFollowing().add(follower);
		}

		userRepository.save(following);
	}

	public boolean isUserFollowing(UUID followerId, UUID followingId) {
		User follower = userRepository.findById(followingId).orElse(null);

		return follower != null
				&& follower.getFollowing().stream().anyMatch(user -> user.getUserId().equals(followerId));
	}

	@Transactional
	public User getUserById(UUID userId) {
		return userRepository.findById(userId)
				.orElseThrow(() -> new NotFoundException("Utente con id " + userId + " non trovato"));
	}

	@Transactional
	public void findByIdAndDelete(UUID id) throws NotFoundException {
		User found = this.findById(id);
		userRepository.delete(found);
	}
	

	@Transactional
	public User findByEmail(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new NotFoundException("Utente con email " + email + " non trovato"));
	}

	@Transactional
	public User findByUsername(String username) {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new NotFoundException("Username " + username + " non corrispondente"));
	}

	@Transactional
	public User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();

		if (principal instanceof User) {
			User user = (User) principal;
			String currentUserName = user.getNome();
			Optional<User> userOptional = userRepository.findByNome(currentUserName);

			if (userOptional.isPresent()) {
				return userOptional.get();
			}
		}

		throw new NotFoundException("Utente non trovato");
	}
	@Transactional
	public UUID getCurrentUserId() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    Object principal = authentication.getPrincipal();

	    if (principal instanceof User) {
	        User user = (User) principal;
	        return user.getUserId();
	    }

	    throw new NotFoundException("Utente non trovato");
	}

	
	@Transactional
	public List<UserDto> getAllUsersExcludingCurrentUser(UUID currentUserId) {
	    User currentUser = getCurrentUser();
	    List<UserDto> userDtos = new ArrayList<>();

	    List<User> allUsers = userRepository.findAllUsersWithDetailsWithoutPosts();
	    List<UUID> followingIds = currentUser.getFollowing().stream()
	            .map(User::getUserId)
	            .collect(Collectors.toList());

	    for (User user : allUsers) {
	        if (!user.getUserId().equals(currentUser.getUserId()) && !followingIds.contains(user.getUserId())) {
	            UserDto userDto = new UserDto();
	            userDto.setUserId(user.getUserId());
	            userDto.setNome(user.getNome());
	            userDto.setCognome(user.getCognome());
	            userDto.setUsername(user.getUsername());
	            userDto.setEmail(user.getEmail());
	            userDto.setBio(user.getBio());
	            userDto.setGenere(user.getGenere());
	            userDto.setProfileImageUrl(user.getProfileImageUrl());

	            userDtos.add(userDto);
	        }
	    }

	    return userDtos;
	}
	
	@Transactional
	public Set<UserDto> getFollowingExcludingCurrentUser(UUID currentUserId) {
	    User currentUser = getCurrentUser();
	    Set<UserDto> followingDtos = new HashSet<>();

	    Set<User> followingUsers = currentUser.getFollowing();

	    for (User user : followingUsers) {
	        if (!user.getUserId().equals(currentUser.getUserId())) {
	        	UserDto userDto = new UserDto();
	            userDto.setUserId(user.getUserId());
	            userDto.setNome(user.getNome());
	            userDto.setCognome(user.getCognome());
	            userDto.setUsername(user.getUsername());
	            userDto.setEmail(user.getEmail());
	            userDto.setBio(user.getBio());
	            userDto.setGenere(user.getGenere());
	            userDto.setProfileImageUrl(user.getProfileImageUrl());

	            followingDtos.add(userDto);
	        }
	    }

	    return followingDtos;
	}




}
