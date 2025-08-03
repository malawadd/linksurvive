import React, { useState } from "react";

import { SETTINGS } from "@const/game";
import { mapEntries } from "@lib/utils";
import { About } from "../about";
import { Controls } from "../controls";

import { Param } from "./param";
import { Wrapper, TabContainer, Tab, TabContent } from "./styles";

type SettingsTab = "settings" | "about" | "controls";

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("settings");

  const renderTabContent = () => {
    switch (activeTab) {
      case "settings":
        return (
          <>
            {mapEntries(SETTINGS, (type, data) => (
              <Param key={type} type={type} data={data} />
            ))}
          </>
        );
      case "about":
        return <About />;
      case "controls":
        return <Controls />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <TabContainer>
        <Tab
          $active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </Tab>
        <Tab
          $active={activeTab === "about"}
          onClick={() => setActiveTab("about")}
        >
          About
        </Tab>
        <Tab
          $active={activeTab === "controls"}
          onClick={() => setActiveTab("controls")}
        >
          Controls
        </Tab>
      </TabContainer>
      <TabContent>{renderTabContent()}</TabContent>
    </Wrapper>
  );
};
