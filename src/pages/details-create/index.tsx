"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { set, push, ref } from "firebase/database";
import { database } from "@/config/firebaseConfig";

const index = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleAddPost = () => {
    try {
      const usersRef = ref(database, "users");
      const newDataRef = push(usersRef);
      set(newDataRef, {
        title: title,
        subtitle: subtitle,
      });
      setSubtitle("");
      setTitle("");
      alert("data added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Create New Users</Heading>
            <FormControl>
              <FormLabel>SubTitle</FormLabel>
              <Input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                onClick={handleAddPost}>
                Create
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            }
          />
        </Flex>
      </Stack>
      <Footer />
    </>
  );
};

export default index;
