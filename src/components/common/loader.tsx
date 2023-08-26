import { Flex, Spinner } from "@chakra-ui/react";

interface T {
  loading: boolean;
}

const SpinnerFullScreen: React.FC<T> = ({ loading }) => {
  return (
    <>
      {loading && (
        <Flex
          flexWrap={"wrap"}
          w={"100vw"}
          h={"100vh"}
          zIndex={"1000"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          top={0}
          left={0}
          bg={"blackAlpha.700"}
          cursor={"not-allowed"}
        >
          {" "}
          <Spinner size="xl" color="gray.50" speed="0.35s" />
        </Flex>
      )}
    </>
  );
};

export default SpinnerFullScreen;
