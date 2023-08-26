import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CompanyCommentsService from "../../../services/company/comments";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  onDeleteComment: () => void;
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  isOpen,
  onClose,
  id,
  onDeleteComment,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleDeleteComment = async () => {
    setLoading(true);
    try {
      await CompanyCommentsService.deleteComment(token, id);
      onDeleteComment();
      toast({
        title: "Comment Deleted",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch {
      toast({
        title: "Error.",
        description: "Error while deleting comment.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(false);
    onClose();
  };
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Comment
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteComment}
              ml={3}
              isLoading={loading}
              loadingText={"Deleting.."}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
