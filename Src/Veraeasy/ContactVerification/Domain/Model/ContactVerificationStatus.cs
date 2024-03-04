namespace Veraeasy.ContactVerification.Domain.Model;

public class ContactVerificationStatus
{
    public string BusinessId { get; set; }
    public string PersonId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    public string Status { get; set; }
}