import React, { useState, useEffect } from "react";
import { useQuery } from "convex/react";

import { Overlay } from "@game/scenes/system/interface/overlay";
import { WalletProvider } from "@scene/wallet-provider";
import { MenuPage } from "@type/menu";
import { api } from "../../../../../convex/_generated/api";
import { Content } from "./content";
import { Copyright } from "./copyright";
import { Navigation } from "./navigation";
import { MintNFT } from "./mint-nft";
import {
  Wrapper,
  Logotype,
  Header,
  Block,
  Main,
  Menu,
  Title,
  RankingContainer,
  RankingItem,
  RankingList,
  RankingTitle,
  SmallText,
  FactionText,
  WawaBlock,
  GifImage,
} from "./styles";

type Props = {
  defaultPage?: MenuPage;
};

export const MenuUI: React.FC<Props> = ({ defaultPage }) => {
  const [page, setPage] = useState(defaultPage ?? MenuPage.NEW_GAME);

  return (
    <WalletProvider>
      <MenuUIContent defaultPage={defaultPage} page={page} setPage={setPage} />
    </WalletProvider>
  );
};

const MenuUIContent: React.FC<{
  defaultPage?: MenuPage;
  page: MenuPage;
  setPage: (page: MenuPage) => void;
}> = ({ defaultPage, page, setPage }) => {
  // Use Convex query for real-time leaderboard data
  const rankingData = useQuery(api.leaderboard.getTopScores, { limit: 5 });

  const getEmojiForRank = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      case 4:
        return "🏅";
      case 5:
        return "🎖️";
      default:
        return "";
    }
  };

  return (
    <Overlay>
      <Wrapper>
        <Header>
          <Block>
            <Logotype src="assets/logotype.png" />
            <Title>Survival</Title>
            <Copyright />
          </Block>
        </Header>

        

        <WawaBlock>
          <GifImage src="assets/aeonNFT_b.png" alt="Aesthetic GIF" />
          <MintNFT />
        </WawaBlock>

        <Menu>
          <Block centerContent>
            <Navigation page={page} onSelect={setPage} />
          </Block>
        </Menu>

        <Main>
          <Block>
            <Content page={page} />
          </Block>
        </Main>

        {rankingData && page == MenuPage.NEW_GAME ? (
          <Main>
            <RankingContainer>
              <RankingTitle>Top Rankings</RankingTitle>
              <RankingList>
                {rankingData?.map((item: any) => (
                  <RankingItem key={item.address}>
                    {getEmojiForRank(item.rank)} Rank {item.rank}:{" "}
                    <SmallText>{item.address}</SmallText>, Score:{" "}
                    <SmallText>{item.score}</SmallText>, TokenID: #
                    {item.tokenId}, Faction:{" "}
                    <FactionText faction={item.faction}>
                      {item.faction}
                    </FactionText>
                  </RankingItem>
                ))}
              </RankingList>
            </RankingContainer>
          </Main>
        ) : null}
      </Wrapper>
    </Overlay>
  );
};

MenuUI.displayName = "MenuUI";
