import React from 'react';
import { Link } from 'react-router-dom';


const SearchBox = ({ forums }) => {
  if (!Array.isArray(forums)) {
      return <div>Forums data is not available or in an unexpected format.</div>;
  }
  return (
<div className="box filter_communities">
    <div className="head">
        <strong>
            <span id="ft_basic_text" className="">Basic /</span>
            <span id="ft_basic_link" className="hidden">
                <a href="#" onClick={() => toggleCommunitySearch('basic')}>Basic</a> /
            </span>
            <span id="ft_advanced_text" className="hidden">Advanced</span>
            <span id="ft_advanced_link" className="">
                <a href="#" onClick={() => toggleCommunitySearch('advanced')}>Advanced</a>
            </span>
            Search
        </strong>
        <span style={{ float: 'right' }}>
            <a href="#" onClick={() => toggleCommunitySearch(0)} id="ft_toggle" className="brackets">Hide</a>
        </span>
    </div>
    <div id="ft_container" className="pad">
        <table className="layout">
            <tbody>
                <tr id="artist_name" className="ftr_advanced hidden">
                    <td className="label">Artist name:</td>
                    <td colSpan="3" className="ft_artistname">
                        <input type="search" spellCheck={false} size="40" name="artistname" className="inputtext smaller fti_advanced" value="" />
                    </td>
                </tr>
                <tr id="album_community_name" className="ftr_advanced hidden">
                <td className="label">Album/Community name:</td>
                <td colspan="3" className="ft_groupname">
                    <input type="search" spellcheck="false" size="40" name="groupname" className="inputtext smaller fti_advanced" value="" />
                </td>
              </tr>
              <tr id="record_label" className="ftr_advanced hidden">
                <td className="label">Record label:</td>
                <td colspan="3" className="ft_recordlabel">
                    <input type="search" spellcheck="false" size="40" name="recordlabel" className="inputtext smaller fti_advanced" value="" />
                </td>
              </tr>
              <tr id="catalogue_number_year" className="ftr_advanced hidden">
                <td className="label">Catalogue number:</td>
                <td className="ft_cataloguenumber">
                    <input type="search" size="40" name="cataloguenumber" className="inputtext smallest fti_advanced" value="" />
                </td>
                <td className="label">Year:</td>
                <td className="ft_year">
                    <input type="search" name="year" className="inputtext smallest fti_advanced" value="" size="4" />
                </td>
             </tr>
              <tr id="edition_expand" className="ftr_advanced hidden">
                <td colspan="4" className="center ft_edition_expand"><a href="#" className="brackets" onclick="ToggleEditionRows(); return false;">Click here to toggle searching for specific remaster information</a></td>
              </tr>
              <tr id="edition_title" className="ftr_advanced hidden hidden">
                <td className="label">Edition title:</td>
                <td className="ft_remastertitle">
                    <input type="search" spellcheck="false" size="40" name="remastertitle" className="inputtext smaller fti_advanced" value="" />
                </td>
                <td className="label">Edition year:</td>
                <td className="ft_remasteryear">
                    <input type="search" name="remasteryear" className="inputtext smallest fti_advanced" value="" size="4" />
                </td>
              </tr>
              <tr id="edition_label" className="ftr_advanced hidden hidden">
                <td className="label">Edition release label:</td>
                <td colspan="3" className="ft_remasterrecordlabel">
                    <input type="search" spellcheck="false" size="40" name="remasterrecordlabel" className="inputtext smaller fti_advanced" value="" />
                </td>
              </tr>
              <tr id="edition_catalogue" className="ftr_advanced hidden hidden">
                <td className="label">Edition catalogue number:</td>
                <td colspan="3" className="ft_remastercataloguenumber">
                    <input type="search" size="40" name="remastercataloguenumber" className="inputtext smallest fti_advanced" value="" />
                </td>
              </tr>
              <tr id="file_list" className="ftr_advanced hidden">
                <td className="label">File list:</td>
                <td colspan="3" className="ft_filelist">
                    <input type="search" spellcheck="false" size="40" name="filelist" className="inputtext fti_advanced" value="" />
                </td>
              </tr>
              <tr id="community_description" className="ftr_advanced hidden">
                <td className="label"><span className="tooltip">Community description:</span></td>
                <td colspan="3" className="ft_description">
                    <input type="search" spellcheck="false" size="40" name="description" className="inputtext fti_advanced" value="" />
                </td>
              </tr>
              <tr id="rip_specifics" className="ftr_advanced hidden">
                <td className="label">Rip specifics:</td>
                <td className="nobr ft_ripspecifics" colspan="3">
                    <select id="bitrate" name="encoding" className="ft_bitrate fti_advanced">
                        <option value="">Bitrate</option>
                        <option value="192">192</option>
                        <option value="APS (VBR)">APS (VBR)</option>
                        <option value="V2 (VBR)">V2 (VBR)</option>
                        <option value="V1 (VBR)">V1 (VBR)</option>
                        <option value="256">256</option>
                        <option value="APX (VBR)">APX (VBR)</option>
                        <option value="V0 (VBR)">V0 (VBR)</option>
                        <option value="q8.x (VBR)">q8.x (VBR)</option>
                        <option value="320">320</option>
                        <option value="Lossless">Lossless</option>
                        <option value="24bit Lossless">24bit Lossless</option>
                        <option value="Other">Other</option>
                    </select>

                    <select name="format" className="ft_format fti_advanced">
                        <option value="">Format</option>
                        <option value="MP3">MP3</option>
                        <option value="FLAC">FLAC</option>
                        <option value="AAC">AAC</option>
                        <option value="AC3">AC3</option>
                        <option value="DTS">DTS</option>
                    </select>
                    <select name="media" className="ft_media fti_advanced">
                        <option value="">Media</option>
                        <option value="CD">CD</option>
                        <option value="DVD">DVD</option>
                        <option value="Vinyl">Vinyl</option>
                        <option value="Soundboard">Soundboard</option>
                        <option value="SACD">SACD</option>
                        <option value="DAT">DAT</option>
                        <option value="Cassette">Cassette</option>
                        <option value="WEB">WEB</option>
                    </select>
                    <select name="releasetype" className="ft_releasetype fti_advanced">
                        <option value="">Release type</option>
                        <option value="1">Album</option>
                        <option value="3">Soundtrack</option>
                        <option value="5">EP</option>
                        <option value="6">Anthology</option>
                        <option value="7">Compilation</option>
                        <option value="9">Single</option>
                        <option value="11">Live album</option>
                        <option value="13">Remix</option>
                        <option value="14">Bootleg</option>
                        <option value="15">Interview</option>
                        <option value="16">Mixtape</option>
                        <option value="21">Unknown</option>
                    </select>
                </td>
              </tr>
              <tr id="misc" className="ftr_advanced hidden">
                <td className="label">Misc:</td>
                <td className="nobr ft_misc" colspan="3">
                    <select name="haslog" className="ft_haslog fti_advanced">
                        <option value="">Has Log</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        <option value="100">100% only</option>
                        <option value="-1">&lt;100%/Unscored</option>
                    </select>
                    <select name="hascue" className="ft_hascue fti_advanced">
                        <option value="">Has Cue</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    <select name="scene" className="ft_scene fti_advanced">
                        <option value="">Scene</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    <select name="vanityhouse" className="ft_vanityhouse fti_advanced">
                        <option value="">Vanity House</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    <select name="freecommunity" className="ft_freecommunity fti_advanced">
                        <option value="">Leech Status</option>
                        <option value="1">Freeleech</option>
                        <option value="2">Neutral Leech</option>
                        <option value="3">Either</option>
                        <option value="0">Normal</option>
                    </select>
                </td>
              </tr>
              <tr id="search_terms" className="ftr_basic">
                <td className="label">Search terms:</td>
                <td colspan="3" className="ftb_searchstr">
                    <input type="search" spellcheck="false" size="40" name="searchstr" className="inputtext fti_basic" value="" />
                </td>
              </tr>
              <tr id="tagfilter">
                <td className="label"><span className="tooltip">Tags (comma-separated):</span></td>
                <td colspan="3" className="ft_taglist">
                    <input type="search" size="40" id="tags" name="taglist" className="inputtext smaller" value="" data-gazelle-autocomplete="true" autocomplete="off" />&nbsp;
                    <input type="radio" name="tags_type" id="tags_type0" value="0"><label for="tags_type0"> Any</label></input>&nbsp;&nbsp;
                    <input type="radio" name="tags_type" id="tags_type1" value="1"><label for="tags_type1"> All</label></input>
                </td>
              </tr>
            <tr id="order">
                <td className="label">Order by:</td>
                <td colspan="3" className="ft_order">
                    <select name="order_by" style={'width: auto'} className="ft_order_by">
                        <option value="time">Time added</option>
                        <option value="year">Year</option>
                        <option value="size">Size</option>
                        <option value="snatched">Snatched</option>
                        <option value="seeders">Seeders</option>
                        <option value="leechers">Leechers</option>
                        <option value="random">Random</option>
                    </select>
                    <select name="order_way" className="ft_order_way">
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </td>
            </tr>
            <tr id="search_group_results">
                <td className="label">
                    <label for="group_results">Group by release:</label>
                </td>
                <td colspan="3" className="ft_group_results">
                    <input type="checkbox" value="1" name="group_results" id="group_results" checked="true" />
                </td>
            </tr>
        </tbody></table>
        <table className="layout cat_list ft_cat_list">
            <tbody><tr>
                <td>
                    <input type="checkbox" name="filter_cat[1]" id="cat_1" value="1" />
                    <label for="cat_1">Music</label>
                </td>
                <td>
                    <input type="checkbox" name="filter_cat[2]" id="cat_2" value="1" />
                    <label for="cat_2">Applications</label>
                </td>
                <td>
                    <input type="checkbox" name="filter_cat[3]" id="cat_3" value="1" />
                    <label for="cat_3">E-Books</label>
                </td>
                <td>
                    <input type="checkbox" name="filter_cat[4]" id="cat_4" value="1" />
                    <label for="cat_4">Audiobooks</label>
                </td>
                <td>
                    <input type="checkbox" name="filter_cat[5]" id="cat_5" value="1" />
                    <label for="cat_5">E-Learning Videos</label>
                </td>
                <td>
                    <input type="checkbox" name="filter_cat[6]" id="cat_6" value="1" />
                    <label for="cat_6">Comedy</label>
                </td>
                <td>
                    <input type="checkbox" name="filter_cat[7]" id="cat_7" value="1" />
                    <label for="cat_7">Comics</label>
                </td>
            </tr>
        </tbody></table>
        <table className="layout cat_list hidden" id="taglist">
            <tbody><tr>onClick={() => toggleTag('basic')}
                <td width="12.5%"><a href="#" onClick={() => toggleTag('female.fronted.symphonic.death.metal')}>female.fronted.symphonic.death.metal</a></td>
                <td width="12.5%"><a href="#" onClick={() => toggleTag('pop')}>pop</a></td>
                <td width="12.5%"><a href="#" onClick={() => toggleTag('rock')}>rock</a></td>
                <td colspan="4"> </td>
            </tr>
        </tbody></table>
        <table className="layout cat_list" width="100%">
            <tbody><tr>
                <td>
                    <a className="brackets" href="random/community">Random Community</a>
                    <a className="brackets" href="random/artist">Random Artist</a>
                </td>
                <td className="label">
                    <a className="brackets" href="#" onclick="$('#taglist').gtoggle(); if (this.innerHTML == 'View tags') { this.innerHTML = 'Hide tags'; } else { this.innerHTML = 'View tags'; }; return false;">View tags</a>
                </td>
            </tr>
            </tbody>

        </table>
    </div>
</div>
)};
module.exports = SearchBox;