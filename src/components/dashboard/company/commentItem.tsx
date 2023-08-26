import React, { useState } from "react";
import {
  Box,
  Avatar,
  VStack,
  HStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaReply, FaTrash, FaEdit, FaReplyAll } from "react-icons/fa";
import { Comment } from "../../../interface/company/comment";
import { Link } from "react-router-dom";
import DeleteAlert from "../../common/alerts/delete";
import EditComment from "../../common/alerts/editComments";
import CommentAddSection from "./addcomment";

interface CommentItemProps {
  comment: Comment;
  sortOption: string;
  id: number;
  onAddComment: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  sortOption,
  id,
  onAddComment,
}) => {
  const deleteRef = useDisclosure();
  const deleteRef1 = useDisclosure();
  const editRef = useDisclosure();
  const [editText, setEditText] = useState("");
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  return (
    <VStack spacing={4} align="start">
      <Box borderWidth={1} borderRadius="md" p={3} w={"100%"} my={2}>
        <Box borderRadius="md" p={3} w={"100%"} bg={"gray.200"}>
          <HStack
            spacing={2}
            my={2}
            as={Link}
            to={`/profile/${comment.user.id}`}
          >
            <Avatar size="sm" name={comment.user.name} />
            <Text fontWeight="bold">{comment.user.name}</Text>
          </HStack>
          <Text fontSize="sm">{comment.text}</Text>
          <Text fontSize="xs" color="gray.500" mt={1} textAlign={"end"}>
            {comment.created_at}
          </Text>
          <HStack spacing={2}>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FaReply />}
              onClick={() => setToggleReply(!toggleReply)}
            >
              Reply
            </Button>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FaEdit />}
              onClick={() => {
                editRef.onOpen();
                setEditText(comment.text);
              }}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FaTrash />}
              onClick={deleteRef.onOpen}
            >
              Delete
            </Button>
          </HStack>
        </Box>
        {toggleReply && (
          <CommentAddSection
            onCommentAdded={onAddComment}
            id={id}
            reply_to={comment.id}
            setToggleReply={setToggleReply}
          />
        )}
        {comment.replies &&
          comment.replies
            .sort((a, b) => {
              if (sortOption === "newest") {
                return b.created_at.localeCompare(a.created_at);
              } else if (sortOption === "oldest") {
                return a.created_at.localeCompare(b.created_at);
              }
              return 0;
            })
            .map((reply) => (
              <Box w={"100%"} key={reply.id} my={2}>
                <Box ml={8} borderRadius="md" p={3} bg={"blue.100"}>
                  <VStack style={{ transform: "rotate(180deg)" }} align={"end"}>
                    <FaReply />
                  </VStack>
                  <HStack
                    spacing={2}
                    my={2}
                    as={Link}
                    to={`/profile/${reply.user.id}`}
                  >
                    <Avatar size="sm" name={reply.user.name} />
                    <Text fontWeight="bold">{reply.user.name}</Text>
                  </HStack>
                  <Text fontSize="sm">{reply.text}</Text>
                  <Text fontSize="xs" color="gray.500" mt={1} textAlign={"end"}>
                    {reply.created_at}
                  </Text>
                  <HStack spacing={2} mx={-2} mt={2} mb={-2} justify={"end"}>
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<FaReply />}
                      // onClick={() => setToggleReply(!toggleReply)}
                    >
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<FaEdit />}
                      onClick={() => {
                        editRef.onOpen();
                        setEditText(comment.text);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<FaTrash />}
                      onClick={deleteRef1.onOpen}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Box>
                <DeleteAlert
                  isOpen={deleteRef1.isOpen}
                  onClose={deleteRef1.onClose}
                  id={reply.id}
                  onDeleteComment={onAddComment}
                />
              </Box>
            ))}
      </Box>
      <EditComment
        isOpen={editRef.isOpen}
        onClose={editRef.onClose}
        text={editText}
      />
      <DeleteAlert
        isOpen={deleteRef.isOpen}
        onClose={deleteRef.onClose}
        id={comment.id}
        onDeleteComment={onAddComment}
      />
    </VStack>
  );
};

export default CommentItem;
