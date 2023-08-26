import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Alert,
  AlertIcon,
  VStack,
  Text,
  List,
  ListItem,
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSubmit: (file: File) => void;
  loading: boolean;
  sampleImage: string;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onFileSubmit,
  loading,
  sampleImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setShowWarning(false);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      if (
        selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setShowWarning(true);
        return;
      }
      onFileSubmit(selectedFile);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Excel File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="warning" variant="left-accent" marginBottom={4}>
            <VStack p={2} alignItems={"flex-start"}>
              {/* <AlertIcon /> */}
              <Text
                fontSize={"lg"}
                fontWeight={"bold"}
                textColor={"orange.600"}
              >
                Instructions:
              </Text>

              <List styleType="decimal" marginLeft={4}>
                <ListItem>
                  Prepare your Excel file. ie. sample file should be like this -
                  <Image src={sampleImage} />
                </ListItem>
                <ListItem>
                  Ensure the file is in the correct format (.xlsx, .xls).
                </ListItem>
                <ListItem>
                  Select the file using the "Choose File" button.
                </ListItem>
                <ListItem>Review the selected file.</ListItem>
              </List>
            </VStack>
          </Alert>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            colorScheme="teal"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose File
          </Button>
          {selectedFile && (
            <p>
              Selected File: <strong>{selectedFile.name}</strong>
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            disabled={!selectedFile}
            isLoading={loading}
            loadingText={"Please Wait..."}
          >
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
