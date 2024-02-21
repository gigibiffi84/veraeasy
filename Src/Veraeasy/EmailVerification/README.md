### What to do

 - expose an endpoint to receive an email address to store in db
 - the entity must keep track of:
   * email address
   * generated otp
   * token for authenticating user origin
   * otp ttl to check if otp is too old (not mandatory)
   * verified a boolean flag to keep track of check verification status

#### Part1 Store the entry
 - the otp expires should  be used to check if the otp is not more ussable
 - the token must be used to access to the check otp operation see below
 - the token must contains an identity and an expires like a jwt

#### Part2 Check the entry and update
 - expose an endpoint to securely check the otp
 - the endpoint must be invoked from a BFF page that provides a simple component to manually insert the code, after code submit if check is success mark the row as verified.
 - no other updates are possible after verified is true.