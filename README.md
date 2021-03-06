# Nintendo PTC Account Generator

***Supported once again! Please use the [PokemonGo-Dev Discord](https://discord.gg/g6k7w83) for questions.***

**Please be sure to clone RECURSIVELY**
example: git clone --recursive https://github.com/FrostTheFox/ptc-acc-gen.git

An automation script based on Nightmare.js that can create any number of Nintendo Pokémon Trainer Club accounts with a single  e-mail address. This only works because Nintendo doesn't check for "email+1@domain.com" e-mail tricks, where the e-mail host completely ignores any part after (and including) the plus sign and sends it to "email@domain.com".

This project was started as a proof of concept: even multi-billion dollar companies that just released the single most popular mobile game (Pokémon Go) sometimes miss the details.

More about plus signs in e-mail addresses [on StackExchange](http://security.stackexchange.com/questions/65244/what-are-the-security-reasons-for-disallowing-the-plus-sign-in-email-addresses).

If you're using Gmail and want to automatically verify all accounts, use this gist: https://gist.github.com/sebastienvercammen/e7e0e9e57db246d7f941b789d8508186
or
https://github.com/FrostTheFox/ptc-acc-gen/blob/master/gmailverify.js


The new version on Nightmare.js now:

* Checks for usernames/e-mails that are already taken
* Can screenshot the result page
* Handles server issues better
* Doesn't require PhantomJS/CasperJS or fiddling with the PATH environment variable

## Requirements
### Prerequisites
* [Node.js](https://nodejs.org/en/)

## Usage
Windows Instructions:

New beta install script! try running "install.bat" (and tell pyr0ball if something doesn't work)

1. Make sure you clone recursively (git clone --recursive [origin])
  - if you download the zip, make sure you also download the submodule PogoPlayer
  - or do it the easy way with `git submodule init && git submodule update`
  - if you cloned non-recursively, run install.bat.
2. Install requirements with `npm install`
2. Open [index.js](index.js) and edit the settings at the top of the file.
3. Run using `makeaccounts.bat`.
4. Wait for the generator to fill in the second page, then accept the captcha and hit submit.
5. Repeat for all accounts
6. Find the generated accounts in PogoPlayer/accounts.csv.

Linux Instructions:  
***Headless systems will no longer be able to use the gen due to the captcha requirement.***

1. Run `install.sh`
2. Open [index.js](index.js) and edit the settings at the top of the file.
3. Run using `makeaccounts.sh`.
4. Wait for the generator to fill in the second page, then accept the captcha and hit submit.
5. Repeat for all accounts
6. Find the generated accounts in PogoPlayer/accounts.csv.

 
***Note: Messages about trainer name usually are not a problem and you generally shouldn't be concerned by them.***


## Configuration
### 1. Generate 10 accounts in the format USERx, where x is 0 to 9.
This example corresponds to the default settings. It will generate 10 accounts in the same format: user0, user1, ...

In [index.js](index.js):

    var start = 0;                      // Start from x (NAMEx, EMAIL+x@domain.com)
    var end = 10;                       // Up to x, but not including (exclusive)

    var useNicknamesFile = false;           // Use nicknames file, or just append numbers to username?
    var outputFile = 'accounts.txt';        // File which will contain the generated "username password" combinations.
    var outputFormat = '%NICK% %PASS%\r\n'; // Format used to save the account data in outputFile. Supports %NICK%, %PASS%.
    
    var useNicknamesFile = false; // Use nicknames file, or just append numbers to username?
    var useRandomPassword = true; // Generate a random password?
    var screenshotResult = true; // Saves a screenshot per account creation if set to true
    var screenshotOnFailure = true; // Saves a screenshot even if registration failed

### 2. Generate random passwords per account.
* Set `var useRandomPassword = true;` in [index.js](index.js).

### 3. Save screenshots.

    var screenshotResult = true; // Saves a screenshot per account creation if set to true
    var screenshotOnFailure = true; // Saves a screenshot even if registration failed
    var screenshotFolder = "output/screenshots/";

### 4. Use a list of unique usernames instead of USERx combinations.
The list of unique usernames must be stored in [nicknames.json](nicknames.json). An example is available on the repo.

To create a number of accounts with custom usernames instead of user + number combinations, change [index.js](index.js):

    var useNicknamesFile = true;
