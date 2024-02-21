namespace Veraeasy.ContactVerification.Data.Database.Reporitories;

public class ContactVerificationAddedChange : IDomainEvent
{
    public Guid VerificationId {get; init;}

    public override string ToString()
    {
        return VerificationId.ToString();
    }
}