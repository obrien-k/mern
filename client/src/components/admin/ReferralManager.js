class ReferralManager {
  constructor() {
    this.accounts = [];
    this.readOnly = false;
  }

  generateToken() {
    return 'OPS|' + this.makeSecret(64) + '|OPS';
  }

  makeSecret(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getTypes() {
    return ['Gazelle (API)', '', '', 'Luminance', 'Gazelle (HTML)', ''];
  }

  getAccounts() {
    return this.accounts;
  }

  getActiveAccounts() {
    return this.accounts.filter((acc) => acc.Active === '1' && !this.readOnly);
  }

  getAccount(id) {
    return this.accounts.find((acc) => acc.ID === id) || null;
  }

  getFullAccount(id) {
    return this.accounts.find((acc) => acc.ID === id) || null;
  }

  getFullAccounts() {
    return this.accounts;
  }

  createAccount(site, url, user, password, active, type, cookie) {
    if (!this.readOnly) {
      const account = {
        ID: this.makeSecret(16),
        Site: site,
        URL: url,
        User: user,
        Password: password,
        Active: active,
        Type: type,
        Cookie: cookie,
      };
      this.accounts.push(account);
    }
  }

  updateAccount(id, site, url, user, password, active, type, cookie) {
    if (!this.readOnly) {
      const accountIndex = this.accounts.findIndex((acc) => acc.ID === id);
      if (accountIndex !== -1) {
        const account = this.accounts[accountIndex];
        account.Site = site;
        account.URL = url;
        account.User = user;
        account.Password = password;
        account.Active = active;
        account.Type = type;
        account.Cookie = cookie;
      }
    }
  }

  deleteAccount(id) {
    const accountIndex = this.accounts.findIndex((acc) => acc.ID === id);
    if (accountIndex !== -1) {
      this.accounts.splice(accountIndex, 1);
    }
  }

  getReferredUsers(startDate, endDate, site, username, invite, limit, view) {
    // Implement the logic to retrieve referred users based on the parameters
  }

  deleteUserReferral(id) {
    // Implement the logic to delete a user referral
  }

  validateCookie(acc) {
    switch (acc.Type) {
      case 0:
        return this.validateGazelleCookie(acc);
      case 1:
        return true;
      case 2:
        return false;
      case 3:
      case 4:
      case 5:
        return this.validateLuminanceCookie(acc);
      default:
        return false;
    }
  }

  validateGazelleCookie(acc) {
    // Implement the logic to validate the Gazelle cookie
  }

  validateLuminanceCookie(acc) {
    // Implement the logic to validate the Luminance cookie
  }

  loginAccount(acc) {
    switch (acc.Type) {
      case 0:
        return this.loginGazelleAccount(acc);
      case 1:
        return true;
      case 2:
        return false;
      case 3:
        return this.loginLuminanceAccount(acc);
      case 4:
        return this.loginGazelleHTMLAccount(acc);
      case 5:
        return false;
      default:
        return false;
    }
  }

    loginGazelleHTMLAccount(acc) {
      if (this.validateLuminanceCookie(acc)) {
        return true;
      }
  
      const url = acc.URL + 'login.php';
  
      const result = this.proxy.fetch(url, {
        username: acc.User,
        password: acc.Password,
        keeplogged: '1',
      }, true);
  
      if (result.status === 200) {
        acc.Cookie = result.cookies;
        this.updateCookie(acc.ID, acc.Cookie);
      }
  
      return result.status === 200;
    }
  
    loginPTPAccount(acc) {
      if (this.validateLuminanceCookie(acc)) {
        return true;
      }
  
      const url = acc.URL + 'login_finish.php';
  
      const result = this.proxy.fetch(url, {
        username: acc.User,
        password: acc.Password,
        keeplogged: '1',
      }, true);
  
      if (result.status === 200) {
        acc.Cookie = result.cookies;
        this.updateCookie(acc.ID, acc.Cookie);
      }
  
      return result.status === 200;
    }
  
    verifyAccount(acc, user, key) {
      switch (acc.Type) {
        case 0:
          return this.verifyGazelleAccount(acc, user, key);
        case 1:
          return false;
        case 2:
          return false;
        case 3:
          return this.verifyLuminanceAccount(acc, user, key);
        case 4:
          return this.verifyGazelleHTMLAccount(acc, user, key);
        case 5:
          return false;
        default:
          return "Unrecognized account type";
      }
    }
  
    verifyGazelleAccount(acc, user, key) {
      if (!this.loginGazelleAccount(acc)) {
        return "Internal error 10";
      }
  
      const url = acc.URL + 'ajax.php';
  
      const result = this.proxy.fetch(url, {
        action: 'usersearch',
        search: user,
      }, acc.Cookie, false);
      const json = JSON.parse(result.response);
  
      if (json.status === 'success') {
        let match = false;
        let userId;
        for (const userResult of json.response.results) {
          if (userResult.username === user) {
            match = true;
            userId = userResult.userId;
            break;
          }
        }
  
        if (match) {
          const result = this.proxy.fetch(url, {
            action: 'user',
            id: userId,
          }, acc.Cookie, false);
          const json = JSON.parse(result.response);
  
          const profile = json.response.profileText;
          match = profile.includes(key);
  
          if (match) {
            return true;
          } else {
            return "Token not found. Please try again.";
          }
        }
      }
  
      return "Token not found. Please try again.";
    }
  
    verifyGGNAccount(acc, user, key) {
      const url = acc.URL + 'api.php';
  
      const result = this.proxy.fetch(url, {
        request: 'user',
        name: user,
        key: acc.Password,
      }, [], false);
      const json = JSON.parse(result.response);
  
      const profile = json.response.profileText;
      const match = profile.includes(key);
  
      if (match) {
        return true;
      } else {
        return "Token not found. Please try again.";
      }
    }
  
    verifyTentacleAccount(acc, user, key) {
      if (!this.loginTentacleAccount(acc)) {
        return "Internal error 11";
      }
  
      const url = acc.URL + 'user/profile/' + user;
  
      const result = this.proxy.fetch(url, {}, acc.Cookie, false);
  
      const profile = result.response;
      const match = profile.includes(key);
  
      if (match) {
        return true;
      } else {
        return "Token not found. Please try again.";
      }
    }
  
    verifyLuminanceAccount(acc, user, key) {
      if (!this.loginLuminanceAccount(acc)) {
        return "Internal error 12";
      }
  
      const url = acc.URL + 'user.php';
  
      const result = this.proxy.fetch(url, { id: user }, acc.Cookie, false);
  
      const profile = result.response;
      const match = profile.includes(key);
  
      if (match) {
        return true;
      } else {
        return "Token not found. Please try again.";
      }
    }
  
    verifyGazelleHTMLAccount(acc, user, key) {
      if (!this.loginGazelleHTMLAccount(acc)) {
        return "Internal error 13";
      }
  
      const url = acc.URL + 'user.php';
  
      const result = this.proxy.fetch(url, { id: user }, acc.Cookie, false);
  
      const profile = result.response;
      const match = profile.includes(key);
  
      if (match) {
        return true;
      } else {
        return "Token not found. Please try again.";
      }
    }
  
    verifyPTPAccount(acc, user, key) {
      if (!this.loginPTPAccount(acc)) {
        return "Internal error 14";
      }
  
      const url = acc.URL + 'user.php';
  
      const result = this.proxy.fetch(url, { id: user }, acc.Cookie, false);
  
      const profile = result.response;
      const match = profile.includes(key);
  
      if (match) {
        return true;
      } else {
        return "Token not found. Please try again.";
      }
    }
  
    generateInvite(acc, username, email, twig) {
      this.db.prepared_query(
        'SELECT Username FROM referral_users WHERE Username = ? AND Site = ?',
        [username, acc.Site]
      ).then(rows => {
        if (rows.length > 0) {
          return [false, `Account already used for referral, join ${BOT_DISABLED_CHAN} on ${BOT_SERVER} for help.`];
        } else {
          const InviteExpires = time_plus(60 * 60 * 24 * 3); // 3 days
          const InviteReason = `This user was referred from their account on ${acc.Site}.`;
          const InviteKey = Users.make_secret();
  
          // save invite to DB
          this.db.prepared_query(
            'INSERT INTO invites (InviterID, InviteKey, Email, Expires, Reason) VALUES (?, ?, ?, ?, ?)',
            [0, InviteKey, email, InviteExpires, InviteReason]
          );
  
          // save to referral history
          this.db.prepared_query(
            'INSERT INTO referral_users (Username, Site, IP, InviteKey) VALUES (?, ?, ?, ?)',
            [username, acc.Site, $_SERVER['REMOTE_ADDR'], InviteKey]
          );
  
          if (REFERRAL_SEND_EMAIL) {
            const message = twig.render('emails/referral.twig', {
              Email: email,
              InviteKey,
              DISABLED_CHAN: BOT_DISABLED_CHAN,
              IRC_SERVER: BOT_SERVER,
              SITE_NAME: SITE_NAME,
              SITE_URL: SITE_URL
            });
            // send email
            Misc.send_email(email, `You have been invited to ${SITE_NAME}`, message, 'noreply', 'text/plain');
          }
  
          return [true, InviteKey];
        }
      });
    }
  }
  
  export default ReferralManager;
  