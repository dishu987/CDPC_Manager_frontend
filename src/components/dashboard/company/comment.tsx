import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  VStack,
  HStack,
  Text,
  Button,
  Textarea,
  Heading,
  useToast,
} from "@chakra-ui/react";
import CommentItem from "./commentItem";
import CompanyCommentsService from "../../../services/company/comments";
import { useSelector } from "react-redux";
import { Comment } from "../../../interface/company/comment";
import FilterDropdown from "./filterComments";
import CommentAddSection from "./addcomment";

const CommentSection: React.FC<{ id: number }> = ({ id }) => {
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [commentAdd, setCommentAdd] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);
  const toast = useToast();
  const fetchComments = async () => {
    try {
      const response = await CompanyCommentsService.getComments(token, id);
      console.log(response.data);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error state or display a notification
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [loading, id]);

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption);
  };
  const onAddComment = async () => {
    await fetchComments();
  };
  return (
    <Box my={5}>
      <Box w={"100%"} mb={5}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          mb={4}
          textColor={"teal.700"}
          fontSize={{ base: "xl", sm: "3xl", lg: "3xl" }}
        >
          Comments
        </Heading>
      </Box>
      <CommentAddSection onCommentAdded={onAddComment} id={id} />
      <Box py={3}>
        <HStack>
          <Text size={"lg"} fontWeight={"bold"} textColor={"teal.600"}>
            Sort By
          </Text>
          <FilterDropdown onChange={handleSortChange} />
        </HStack>
      </Box>
      {loading && "loading.."}
      {!loading &&
        comments
          .sort((a, b) => {
            if (sortOption === "newest") {
              return b.created_at.localeCompare(a.created_at);
            } else if (sortOption === "oldest") {
              return a.created_at.localeCompare(b.created_at);
            }
            return 0;
          })
          .map((comment) => (
            <>
              <CommentItem
                key={comment.id}
                comment={comment}
                sortOption={sortOption}
                onAddComment={onAddComment}
                id={id}
              />
            </>
          ))}
    </Box>
  );
};

export default CommentSection;
