import {
  Body,
  BackgroundImage,
  DirectoryItemContainer,
} from "./directory-item.styles";

import type { Directory } from "../Directory/Directory";
import { useNavigate } from "react-router-dom";

type DirectoryProps = {
  category: Directory;
};

const DirectoryItem = ({ category }: DirectoryProps) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigate = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigate}>
      <BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
      <Body className="body">
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
