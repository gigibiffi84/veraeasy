namespace Veraeasy.Auth;

public record UserCredentials(string username, string password);

public record TokenUserCredentials(string refresh_token);

public record TokenResponse(
    string access_token,
    int expires_in,
    int refresh_expires_in,
    string refresh_token,
    string token_type,
    string id_token);