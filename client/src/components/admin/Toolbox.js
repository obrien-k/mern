import React from 'react';
import { Link } from 'react-router-dom';

const Toolbox = ({userId}) => {
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
                                <tr><td><Link to="/private/staff/tools/permissions">Permissions manager</Link></td></tr>
                                <tr><td><a href="private/tools/staff_groups">Staff page group manager</a></td></tr>
                                <tr><td><a href="tools.php?action=whitelist">Torrent client whitelist</a></td></tr>
                                <tr><td><a href="tools.php?action=dbkey">Database encryption key</a></td></tr>
                                <tr><td><a href="tools.php?action=enable_requests">Auto-Enable requests</a></td></tr>
                                <tr><td><a href="tools.php?action=login_watch">Login watch</a></td></tr>
                                {/* ... other links */}
                            </tbody>
                        </table>
                    </div>
                    <div className="permission_subcontainer">
                        <table className="layout">
                            <tbody><tr className="colhead"><td>Announcements</td></tr>
                            <tr><td><a href="tools.php?action=news">News post</a></td></tr>
                            <tr><td><a href="tools.php?action=global_notification">Global notification</a></td></tr>
                            <tr><td><a href="tools.php?action=mass_pm">Mass PM</a></td></tr>
                            <tr><td><a href="tools.php?action=change_log">Change log</a></td></tr>
                            <tr><td><a href="tools.php?action=calendar">Calendar</a></td></tr>
                            <tr><td><a href="tools.php?action=vanityhouse">Vanity House</a></td></tr>
                            <tr><td><a href="tools.php?action=monthalbum">Album of the Month</a></td></tr>            
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
                                    <td><a href="tools.php?action=categories">Category manager</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=forum">Forum manager</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=forum_transitions">Forum transition manager</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=irc">IRC manager</a></td>
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
                                    <td><a href="tools.php?action=rerender_gallery">Render stylesheet gallery</a></td>
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
                                <tr><td><a href="/private/tools/create_user">Create user</a></td></tr>
                                <tr><td><a href="tools.php?action=special_users">Special users</a></td></tr>
                                <tr><td><a href="tools.php?action=user_flow">User flow</a></td></tr>
                                <tr><td><a href="tools.php?action=registration_log">Registration log</a></td></tr>
                                <tr><td><a href="tools.php?action=invite_pool">Invite pool</a></td></tr>
                                <tr><td><a href="tools.php?action=manipulate_tree">Manage invite tree</a></td></tr> 
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
                                    <td><a href="tools.php?action=bonus_points">Manage bonus points</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=multiple_freeleech">Multiple freeleech</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=tokens">Manage freeleech tokens</a></td>
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
                                    <td><a href="tools.php?action=ip_ban">IP address bans</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=dupe_ips">Duplicate IP addresses</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=email_blacklist">Email blacklist</a></td>
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
                                    <td><a href="tools.php?action=recommend">Recommended torrents</a></td>
                                </tr>
                                <tr>
                                    <td><a href="collages.php?action=recover">Collage recovery</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=dnu">"Do Not Upload" list</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=label_aliases">Label aliases</a></td>
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
                                    <td><a href="tools.php?action=tag_aliases">Tag aliases</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=edit_tags">Batch tag editor</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=official_tags">Official tags manager</a></td>
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
                                <tr><td><a href="/private/tools/economic_stats">Economic stats</a></td></tr>
                                <tr><td><a href="tools.php?action=torrent_stats">Torrent stats</a></td></tr>
                                <tr><td><a href="tools.php?action=upscale_pool">Ratio watch</a></td></tr>
                                <tr><td><a href="tools.php?action=platform_usage">OS and browser usage</a></td></tr> 
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
                                    <td><a href="tools.php?action=bitcoin_balance">Bitcoin (balance)</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=bitcoin_unproc">Bitcoin (unprocessed)</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=donation_log">Donation log</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=donor_rewards">Donor rewards</a></td>
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
                                    <td><a href="tools.php?action=artist_importance_sandbox">Artist Importance</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=bbcode_sandbox">BBCode sandbox</a></td>
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
                                    <td><a href="tools.php?action=clear_cache">Cache key management</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=process_info">PHP processes</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=service_stats">Service stats</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=site_info">Site info</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=site_options">Site options</a></td>
                                </tr>
                                <tr>
                                    <td><a href="schedule.php?auth=49bfca1e8f1be12d93dde136ec364d0f">Schedule</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=ocelot_info">Tracker info</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=update_geoip">Update GeoIP</a></td>
                                </tr>
                                <tr>
                                    <td><a href="tools.php?action=update_offsets">Update drive offsets</a></td>
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