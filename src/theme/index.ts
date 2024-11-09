import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import Badge from "./components/badge";
import Button from "./components/button";
import Container from "./components/container";
import FormLabel from "./components/formLabel";
import Input from "./components/input";
import Menu from "./components/menu";
import Modal from "./components/modal";
import Progress from "./components/progress";
import Radio from "./components/radio";
import Skeleton from "./components/skeleton";
import Tabs from "./components/tabs";
import { Tag } from "./components/tag";
import Textarea from "./components/textarea";
import Tooltip from "./components/tooltip";
import Heading from "./components/heading";
import { mode } from "@chakra-ui/theme-tools";
import { Table } from "./components/table";
import { Checkbox } from "./components/checkbox";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Golos Text', sans-serif",
    body: "'Golos Text', sans-serif",
  },
  colors,
  components: {
    Heading,
    Button,
    Input,
    Container,
    Tabs,
    Modal,
    Badge,
    Progress,
    Skeleton,
    Tooltip,
    Radio,
    Tag,
    Menu,
    Textarea,
    FormLabel,
    Table,
    Checkbox,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("#fff", "#000")(props),
      },
    }),
  },
});
