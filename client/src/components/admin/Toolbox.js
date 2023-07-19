import React from "react";
import { Link } from "react-router-dom";

const Toolbox = ({ userId }) => {
  return (
    <div id="content">
      <div className="permissions">
        {/* begin left column */}
        <div className="permission_container">
          <div className="permission_subcontainer">
            <table className="layout">
              <thead>
                <tr className="colhead">
                  <td>Administration</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/permissions">
                      Permissions manager
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="private/tools/staff_groups">
                      Staff page group manager
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=whitelist">
                      Torrent client whitelist
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=dbkey">
                      Database encryption key
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=enable_requests">
                      Auto-Enable requests
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=login_watch">Login watch</Link>
                  </td>
                </tr>
                {/* ... other links */}
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Announcements</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=news">News post</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=global_notification">
                      Global notification
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=mass_pm">Mass PM</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=change_log">Change log</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=calendar">Calendar</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=vanityhouse">Vanity House</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=monthalbum">
                      Album of the Month
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Community</td>
                </tr>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/categories">
                      Category manager
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/forums">Forum manager</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=forum_transitions">
                      Forum transition manager
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=irc">IRC manager</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Stylesheets</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=rerender_gallery">
                      Render stylesheet gallery
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* begin middle column */}
        <div className="permission_container">
          <div className="permission_subcontainer">
            <table className="layout">
              <thead>
                <tr className="colhead">
                  <td>User management</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/user/new">Create user</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/user/special">
                      Special users
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/user/flow">User flow</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/user/log">
                      Registration log
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/user/invite-pool">
                      Invite pool
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/private/staff/tools/user/invite-tree">
                      Manage invite tree
                    </Link>
                  </td>
                </tr>
                {/* ... other links */}
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Rewards</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=bonus_points">
                      Manage bonus points
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=multiple_freeleech">
                      Multiple freeleech
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=tokens">
                      Manage freeleech tokens
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Managers</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=ip_ban">IP address bans</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=dupe_ips">
                      Duplicate IP addresses
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=email_blacklist">
                      Email blacklist
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Torrents</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=recommend">
                      Recommended torrents
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="collages.php?action=recover">
                      Collage recovery
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=dnu">"Do Not Upload" list</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=label_aliases">
                      Label aliases
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Tags</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=tag_aliases">Tag aliases</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=edit_tags">
                      Batch tag editor
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=official_tags">
                      Official tags manager
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* begin right column */}
        <div className="permission_container">
          <div className="permission_subcontainer">
            <table className="layout">
              <thead>
                <tr className="colhead">
                  <td>Site Information</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to="/private/tools/economic_stats">
                      Economic stats
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=torrent_stats">
                      Torrent stats
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=upscale_pool">Ratio watch</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=platform_usage">
                      OS and browser usage
                    </Link>
                  </td>
                </tr>
                {/* ... other links */}
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Finances</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=bitcoin_balance">
                      Bitcoin (balance)
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=bitcoin_unproc">
                      Bitcoin (unprocessed)
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=donation_log">Donation log</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=donor_rewards">
                      Donor rewards
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Developer Sandboxes</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=artist_importance_sandbox">
                      Artist Importance
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=bbcode_sandbox">
                      BBCode sandbox
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="permission_subcontainer">
            <table className="layout">
              <tbody>
                <tr className="colhead">
                  <td>Development</td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=clear_cache">
                      Cache key management
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=process_info">
                      PHP processes
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=service_stats">
                      Service stats
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=site_info">Site info</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=site_options">Site options</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="schedule.php?auth=49bfca1e8f1be12d93dde136ec364d0f">
                      Schedule
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=ocelot_info">Tracker info</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=update_geoip">Update GeoIP</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="tools.php?action=update_offsets">
                      Update drive offsets
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
