"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Box,
  Heading,
  Button,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { get, ref } from "firebase/database";
import { database } from "@/config/firebaseConfig";

interface Props {
  marginTop?: number;
  tags: any[];
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const index = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const postsPerPage: number = 1;
  const router = useRouter();

  useEffect(() => {
    const usersRef = ref(database, "users");
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);

  console.log("Post", data);

  const handlePageChange = (selectedObject: { selected: number }) => {
    setCurrentPage(selectedObject.selected);
  };

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <>
      <Navbar />
      <Container maxW={"7xl"} p="12">
        <Heading as="h1">Stories by Chakra Templates</Heading>

        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between">
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center">
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%">
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  borderRadius="lg"
                  src={
                    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(orange.600 1px, transparent 1px)",
                  "radial(orange.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>

          {currentPosts.map((post, index) => (
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
              key={index}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <BlogTags tags={["Engineering", "Product"]} />
                <Button
                  marginTop="2"
                  size={"md"}
                  w={"fit-content"}
                  onClick={() => router.push(`details/${post.id}`)}>
                  Read More
                </Button>
              </Box>
              <Heading marginTop="1">
                <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {post.subtitle}
                </Text>
              </Heading>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="lg">
                {post.title}
              </Text>
              <BlogAuthor
                name={post.id}
                date={new Date("2021-04-06T19:01:27Z")}
              />
            </Box>
          ))}
        </Box>
        <Flex
          mt={10}
          flexDirection={"row"}
          alignItems="center"
          justifyContent="center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(data.length / postsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={
              "pagination w-full flex justify-center gap-[13px] text-secondary/base font-[700]"
            }
            previousClassName="py-[8px] px-[15px]"
            nextClassName="py-[8px] px-[15px]"
            pageClassName="py-[8px] px-[15px]"
            activeClassName={
              "text-[white] py-[8px] px-[15px] bg-secondary/base rounded-[5px]"
            }
          />
        </Flex>
        {/* <CommentsBlog /> */}
      </Container>
      <Footer />
    </>
  );
};

export default index;
