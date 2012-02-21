<?php

class Identity
{
	public $id, $authType, $authLevel;
	
	public function __construct($auth_token)
    {
    	if (!$auth_token) # ERROR
		{
			$action_result["status"] = "Failed";
			$action_result["errorType"] = "SecurityException";
			$action_result["errorMessage"] = "Invalid identity token.";
			
			exit();
		}
		
		$query_result = mysql_query(sprintf("SELECT * FROM ACCESS_GEAR_IDENTITY_TOKEN WHERE IDENTITY_TOKEN = '%s'", mysql_real_escape_string($auth_token)));
		if (!$query_result)
		{
			$action_result["status"] = "Failed";
			$action_result["errorType"] = "ServerException";
			$action_result["errorMessage"] = "Invalid query: " . mysql_error();
				
			exit();
		}
		
		$row = mysql_fetch_assoc($query_result);
		
		if ($row)
		{
			// TODO: Check expiration, etc...
		
			$this->id = $row["IDENTITY_ID"];
			$this->authType = "PassKey";
			$this->authLevel = 0; 
			
			$access_gear_id = $row["ACCESS_GEAR_ID"];
		}
		else # ERROR
		{
			$action_result["status"] = "Failed";
			$action_result["errorType"] = "SecurityException";
			$action_result["errorMessage"] = "Invalid identity token.";
			
			exit();
		}
    }
    
    public function getAccounts()
    {
    	return "";
    }
    
    public function getOffers()
    {
    	return "";
    }
}

?>
