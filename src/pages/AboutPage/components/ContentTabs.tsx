import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import About from "./About";
import Support from "./Support";
import { FAQ } from "./FAQ";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ContentTabs = () => {
  const { t } = useTranslation();
  const { state } = useLocation();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  useEffect(() => {
    if (state?.initialTab) {
      setTabIndex(state?.initialTab);
    }
  }, [state?.initialTab]);

  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} flexGrow={1}>
      <TabList>
        <Tab>{t("about_service")}</Tab>
        <Tab>{t("faq")}</Tab>
        <Tab>{t("support")}</Tab>
      </TabList>

      <TabPanels h={"calc(100% - 50px)"}>
        <TabPanel h={"100%"} p={"20px 0 0 0"}>
          <About />
        </TabPanel>
        <TabPanel h={"100%"} p={"20px 0 0 0"}>
          <FAQ />
        </TabPanel>
        <TabPanel h={"100%"} p={"20px 0 0 0"}>
          <Support />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ContentTabs;
