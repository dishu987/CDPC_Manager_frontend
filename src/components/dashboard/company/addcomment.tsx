import React, { useState } from "react";
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
import CompanyCommentsService from "../../../services/company/comments";
import { useSelector } from "react-redux";

interface CommentAddSectionProps {
  id: number;
  onCommentAdded: () => void;
  reply_to?: number;
  setToggleReply?: any;
}

const CommentAddSection: React.FC<CommentAddSectionProps> = ({
  id,
  onCommentAdded,
  reply_to,
  setToggleReply,
}) => {
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const [commentAdd, setCommentAdd] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);
  const toast = useToast();

  const handleAddComment = async () => {
    if (commentAdd === "") {
      toast({
        title: "Error.",
        description: "Text field Required.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    setLoadingAdd(true);
    try {
      if (reply_to) {
        await CompanyCommentsService.addComment(token, {
          text: commentAdd,
          company: id,
          reply_to: reply_to,
        });
      } else {
        await CompanyCommentsService.addComment(token, {
          text: commentAdd,
          company: id,
        });
      }
      onCommentAdded();
      toast({
        title: "Comment Added.",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch {
      toast({
        title: "Error.",
        description: "Error while adding comment.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoadingAdd(false);
    setCommentAdd("");
    setToggleReply(false);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" my={5}>
      <VStack align="start" spacing={4}>
        <HStack spacing={2}>
          <Avatar size="sm" name="Your Name" />
          <Text fontWeight="bold">You</Text>
        </HStack>
        <Textarea
          placeholder="Add a public comment..."
          size="sm"
          borderRadius="md"
          value={commentAdd}
          onChange={(e) => setCommentAdd(e.target.value)}
        />
        <VStack w={"100%"} align="end">
          <Button
            size="md"
            variant={"solid"}
            colorScheme="linkedin"
            onClick={handleAddComment}
            isLoading={loadingAdd}
            isDisabled={loadingAdd}
            loadingText={"Adding.."}
          >
            Comment
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CommentAddSection;
