import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContribution } from "../../../actions/communities";
import {
  getAllCommunities,
  getCommunityGroups,
} from "../../../actions/communities";
import { getAllArtists } from "../../../actions/artist";
import AutoComplete from "../../../utils/AutoComplete";
//import DoNotContributeList from "./DoNotContributeList";

const ContributeForm = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [releaseDescription, setReleaseDescription] = useState("");
  const [type, setType] = useState("music");
  const communityGroups = useSelector(
    (state) => state.communities.communityGroups
  );
  const communities = useSelector((state) => state.communities.communities);
  const userId = useSelector((state) => state.auth.user._id);
  const [group, setGroup] = useState("");
  const [community, setCommunity] = useState("");
  const [artistType, setArtistType] = useState("Main");

  const [contributors, setContributors] = useState([userId]);
  const [collaborators, setCollaborators] = useState([]);
  const ArtistTypesArray = [
    "Main artist",
    "Guest artist",
    "Remixer",
    "Composer",
    "Conductor",
    "DJ",
    "Producer",
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "music") {
      setCollaborators([{ artist: "", importance: "Main" }]);
    } else {
      setCollaborators([]);
    }
  }, [type]);

  useEffect(() => {
    dispatch(getAllCommunities());
    dispatch(getAllArtists());
  }, [dispatch]);

  const allArtists = useSelector((state) =>
    state.artist.artists.map((artist) => artist.name)
  );

  useEffect(() => {
    if (community !== "") {
      dispatch(getCommunityGroups(community));
    }
  }, [dispatch, community]);

  const communityChange = (e) => {
    setCommunity(e.target.value);
  };

  const collaboratorChange = (e, index, field) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators[index] = {
      ...updatedCollaborators[index],
      [field]: e.target.value,
    };
    setCollaborators(updatedCollaborators);
  };

  const addCollaborator = () => {
    const newCollaborator = { artist: "", importance: "" };
    if (collaborators.length === 0) {
      newCollaborator.importance = "Main";
    }
    setCollaborators([...collaborators, newCollaborator]);
  };

  const removeCollaborator = (index) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators.splice(index, 1);
    setCollaborators(updatedCollaborators);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      title,
      tags,
      image,
      description,
      group,
      collaborators,
      contributors,
      type,
    };
    if (type === "music") {
      formData = { ...formData, artist, album, releaseDescription };
    }
    dispatch(createContribution(formData));
  };

  // clear form when not music
  useEffect(() => {
    if (type !== "music") {
      setArtist("");
      setAlbum("");
      setReleaseDescription("");
    }
  }, [type]);

  return (
    <div id="content">
      <div className="thin">
        <form
          className="create_form"
          name="community"
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit}
        >
          <div>
            <input type="hidden" name="submit" value="true" />
            <input
              type="hidden"
              name="auth"
              value="49bfca1e8f1be12d93dde136ec364d0f"
            />
          </div>
          <table
            cellPadding="3"
            cellSpacing="1"
            border="0"
            className="layout border"
            width="100%"
          >
            <tbody>
              <tr>
                <td className="label">Community</td>
                <td>
                  {communities.length !== 0 && (
                    <select
                      name="community"
                      id="community"
                      value={community}
                      onChange={communityChange}
                    >
                      <option value="">Select a community</option>
                      {communities.map((community) => (
                        <option key={community._id} value={community._id}>
                          {community.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
              <tr>
                <td className="label">Group</td>
                <td>
                  {communityGroups.length !== 0 && (
                    <select
                      name="group"
                      id="group"
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                    >
                      <option value="">Select a group</option>
                      {communityGroups.map((group) => (
                        <option key={group._id} value={group._id}>
                          {group.title}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
              <tr>
                <td className="label">Type:</td>
                <td>
                  <select
                    name="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="music">Music</option>
                    <option value="applications">Applications</option>
                    <option value="ebooks">eBooks</option>
                    <option value="audiobooks">Audiobooks</option>
                    <option value="comedy">Comedy</option>
                    <option value="comics">Comics</option>
                  </select>
                </td>
              </tr>
              {type !== "music" && (
                <tr>
                  <td className="label">Title:</td>
                  <td>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      size="60"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                </tr>
              )}
              {type === "music" && (
                <tr>
                  <td className="label">Artist(s):</td>
                  <td id="artistfields">
                    <p id="vawarning" className="hidden">
                      Please use the multiple artists feature rather than adding
                      "Various Artists" as an artist; read{" "}
                      <a
                        href="wiki.php?action=article&amp;id=64"
                        target="_blank"
                      >
                        this
                      </a>{" "}
                      for more information.
                    </p>

                    {collaborators.map((collaborator, index) => (
                      <div key={index}>
                        <AutoComplete
                          inputValue={collaborator.artist}
                          suggestions={allArtists}
                          onInputChange={(newInputValue) =>
                            collaboratorChange(
                              { target: { value: newInputValue } },
                              index,
                              "artist"
                            )
                          }
                          onSelect={(suggestion) =>
                            collaboratorChange(
                              { target: { value: suggestion } },
                              index,
                              "artist"
                            )
                          }
                        />
                        {ArtistTypesArray.length !== 0 && (
                          <select
                            name="artistType"
                            id="artistType"
                            value={artistType}
                            onChange={(e) => setArtistType(e.target.value)}
                          >
                            <option value="Main">Main</option>
                            {ArtistTypesArray.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        )}
                        {index > 0 && (
                          <a
                            href="#"
                            onClick={() => removeCollaborator(index)}
                            className="brackets"
                          >
                            −
                          </a>
                        )}
                      </div>
                    ))}
                    <a href="#" onClick={addCollaborator} className="brackets">
                      +
                    </a>
                  </td>
                </tr>
              )}
              {type === "music" && (
                <tr>
                  <td className="label">Album title:</td>
                  <td>
                    <input
                      type="text"
                      id="album"
                      name="album"
                      size="60"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td className="label">Tags:</td>
                <td>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    size="60"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Image (optional):</td>
                <td>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    size="60"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </td>
              </tr>
              {type !== "music" && (
                <tr>
                  <td className="label">Description:</td>
                  <td>
                    <textarea
                      name="desc"
                      id="desc"
                      cols="60"
                      rows="8"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {type === "music" && (
            <table
              cellPadding="3"
              cellSpacing="1"
              border="0"
              className="layout border slice"
              width="100%"
            >
              <tbody>
                <tr>
                  <td className="label">Album description:</td>
                  <td>
                    <input
                      type="text"
                      id="albumDescription"
                      name="albumDescription"
                      size="60"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Release Description (optional):</td>
                  <td>
                    <input
                      type="text"
                      id="releaseDescription"
                      name="releaseDescription"
                      size="60"
                      value={releaseDescription}
                      onChange={(e) => setReleaseDescription(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <table
            cellPadding="3"
            cellSpacing="1"
            border="0"
            className="layout border slice"
            width="100%"
          >
            <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  {/* Rest of the content */}
                  <input id="post" type="submit" value={`Contribute release`} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ContributeForm;
