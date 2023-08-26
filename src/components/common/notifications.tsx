import { Box, Badge, Text, VStack } from "@chakra-ui/react";
import { NotificationPanelProps } from "../../interface/data/notificationInterface";

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
}) => {
  return (
    <>
      {notifications.length > 0 && (
        <VStack align="start" spacing={2} px={"4"} py={"2"}>
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              p={2}
              bg={notification.isRead ? "gray.200" : "white"}
            >
              <Text fontWeight="bold">{notification.title}</Text>
              <Text>{notification.message}</Text>
              <Text fontSize="sm" color="gray.500">
                {notification.timestamp.toLocaleString()}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </>
  );
};

export default NotificationPanel;
