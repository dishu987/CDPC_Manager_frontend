import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import CompanyRegisterService from "../../../services/company/add";
import { useSelector } from "react-redux";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  pk: string | undefined;
}

const VarifyCompanyAlert: React.FC<DeleteAlertProps> = ({
  isOpen,
  onClose,
  pk,
}) => {
  const toast = useToast();
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleVarify = async () => {
    setLoading(true);
    try {
      await CompanyRegisterService.companyVarify(token, pk);
      toast({
        title: "Company Varified.",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: "Error.",
        description: "Invalid Crediatials.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(false);
    onClose();
    window.location.reload();
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
            Varify Company Status
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleVarify}
              ml={3}
              isLoading={loading}
              loadingText={"Please Wait.."}
            >
              Varify
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default VarifyCompanyAlert;
