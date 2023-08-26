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
import { useSelector } from "react-redux";
import CompanyRegisterService from "../../../services/company/add";

interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  pk: string | undefined;
}

const BlacklistRemoveCompanyAlert: React.FC<DeleteAlertProps> = ({
  isOpen,
  onClose,
  pk,
}) => {
  const toast = useToast();
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleBlacklist = async () => {
    setLoading(true);
    try {
      await CompanyRegisterService.companyRemoveBlacklist(token, pk);
      toast({
        title: "Company Removed from Blacklist.",
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
            Blacklist Company
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure want to remove this Company from Blacklist?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleBlacklist}
              ml={3}
              isLoading={loading}
              loadingText={"Please Wait.."}
            >
              Block
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default BlacklistRemoveCompanyAlert;
