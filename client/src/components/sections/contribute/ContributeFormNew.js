import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommunities,
  getCommunityGroups,
  createContribution,
} from "../../../actions/communities";
import { getAllArtists } from "../../../actions/artist";
import AutoComplete from "../../../utils/AutoComplete";

const ArtistTypesArray = [
  "Main artist",
  "Guest artist",
  "Remixer",
  "Composer",
  "Conductor",
  "DJ",
  "Producer",
];

const ContributeForm = () => {
  const initialState = {
    title: "",
    tags: "",
    image: "",
    description: "",
    artist: "",
    album: "",
    releaseDescription: "",
    type: "music",
    community: "",
    group: "",
    artistType: "Main",
    contributors: [useSelector((state) => state.auth.user._id)],
    collaborators: [],
  };
  const [formState, setFormState] = useState(initialState);
  const dispatch = useDispatch();

  const communities = useSelector((state) => state.communities.communities);
  const communityGroups = useSelector(
    (state) => state.communities.communityGroups
  );
  const allArtists = useSelector((state) =>
    state.artist.artists.map((artist) => artist.name)
  );

  useEffect(() => {
    dispatch(getAllCommunities());
    dispatch(getAllArtists());
  }, [dispatch]);

  useEffect(() => {
    if (formState.community !== "") {
      dispatch(getCommunityGroups(formState.community));
    }
  }, [dispatch, formState.community]);

  useEffect(() => {
    if (formState.type === "music") {
      setFormState((prev) => ({
        ...prev,
        collaborators: [{ artist: "", importance: "Main" }],
      }));
    } else {
      setFormState((prev) => ({ ...prev, collaborators: [] }));
    }
  }, [formState.type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const collaboratorChange = (e, index, field) => {
    const updatedCollaborators = [...formState.collaborators];
    updatedCollaborators[index] = {
      ...updatedCollaborators[index],
      [field]: e.target.value,
    };
    setFormState((prev) => ({ ...prev, collaborators: updatedCollaborators }));
  };

  const addCollaborator = () => {
    const newCollaborator = { artist: "", importance: "" };
    if (formState.collaborators.length === 0) {
      newCollaborator.importance = "Main";
    }
    setFormState((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, newCollaborator],
    }));
  };

  const removeCollaborator = (index) => {
    const updatedCollaborators = [...formState.collaborators];
    updatedCollaborators.splice(index, 1);
    setFormState((prev) => ({
      ...prev,
      collaborators: updatedCollaborators,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...formState };

    if (formState.type !== "music") {
      formData.artist = "";
      formData.album = "";
      formData.releaseDescription = "";
    }
    dispatch(createContribution(formData));
  };

  const ArtistSelector = ({ collaborator, index }) => (
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
          collaboratorChange({ target: { value: suggestion } }, index, "artist")
        }
      />
      {ArtistTypesArray.length !== 0 && (
        <select
          name="artistType"
          id="artistType"
          value={collaborator.importance}
          onChange={(e) => collaboratorChange(e, index, "importance")}
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
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Tags
        <input
          type="text"
          name="tags"
          value={formState.tags}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Image
        <input
          type="text"
          name="image"
          value={formState.image}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Type
        <select name="type" value={formState.type} onChange={handleInputChange}>
          <option value="music">Music</option>
          {/* Add other options here as needed */}
        </select>
      </label>

      {formState.type === "music" && (
        <>
          <label>
            Artist
            <input
              type="text"
              name="artist"
              value={formState.artist}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Album
            <input
              type="text"
              name="album"
              value={formState.album}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Release Description
            <textarea
              name="releaseDescription"
              value={formState.releaseDescription}
              onChange={handleInputChange}
            />
          </label>

          {formState.collaborators.map((collaborator, index) => (
            <ArtistSelector collaborator={collaborator} index={index} />
          ))}

          <button type="button" onClick={addCollaborator}>
            Add Collaborator
          </button>
        </>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContributeForm;
