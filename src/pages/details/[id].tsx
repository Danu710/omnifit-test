import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { database } from "@/config/firebaseConfig";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function Page({ postId }: { postId: string }) {
  const [blog, setBlog] = useState<any>([]);

  useEffect(() => {
    async function fetchBlog() {
      const blogRef = ref(database, `users/${postId}`);
      try {
        const snapshot = await get(blogRef);
        if (snapshot.exists()) {
          setBlog(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchBlog();
  }, [postId]);

  console.log("Blog", blog);

  return (
    <>
      <Navbar />
      <Box>
        <Center py={6}>
          <Box
            maxW={"270px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}>
            <Image
              h={"120px"}
              w={"full"}
              src={
                "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              }
              objectFit="cover"
              alt="#"
            />
            <Flex justify={"center"} mt={-12}>
              <Avatar
                size={"xl"}
                src={
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                }
                css={{
                  border: "2px solid white",
                }}
              />
            </Flex>

            <Box p={6}>
              <Stack spacing={0} align={"center"} mb={5}>
                <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                  {blog.subtitle}
                </Heading>
                <Text color={"gray.500"}>{blog.title}</Text>
              </Stack>

              <Stack direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>Status</Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    {blog.id}
                  </Text>
                </Stack>
              </Stack>

              <Button
                w={"full"}
                mt={8}
                bg={useColorModeValue("#151f21", "gray.900")}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}>
                Follow
              </Button>
            </Box>
          </Box>
        </Center>
      </Box>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const postId = params?.id;

  // Fetch data based on the postId
  // Replace this with your actual data fetching logic
  const postData: Post = {
    id: postId as string,
    title: `Post ${postId}`,
    content: `Content for Post ${postId}`,
  };

  return {
    props: {
      postId: postData.id,
    },
  };
};
