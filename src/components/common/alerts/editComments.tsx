import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface EditCommentAlertProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const EditComment: React.FC<EditCommentAlertProps> = ({
  isOpen,
  onClose,
  text,
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [content, setContent] = useState<string>(text);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Text</FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="type here.."
                rows={2}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditComment;
