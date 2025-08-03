import React, { useState, useEffect } from "react";
import { useQuery } from "@convex-dev/react";

import { Overlay } from "@game/scenes/system/interface/overlay";
import { WalletProvider } from "@scene/wallet-provider";
import { MenuPage } from "@type/menu";
import { api } from "../../../../convex/_generated/api";
import { Content } from "./content";
import { Copyright } from "./copyright";
import { Navigation } from "./navigation";
import {
  Wrapper,
  Logotype,
  Header,
  Block,
  Main,
  Menu,
  Title,
  Link,
  GifImage,
  WawaBlock,
  RankingContainer,
  RankingItem,
  RankingList,
  RankingTitle,
  SmallText,
  FactionText,
} from "./styles";

type Props = {
  defaultPage?: MenuPage;
};


export const MenuUI: React.FC<Props> = ({ defaultPage }) => {
  const [page, setPage] = useState(defaultPage ?? MenuPage.NEW_GAME);
  
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

        <WawaBlock href="https://aeonnft.vercel.app/" target="_blank">
          <GifImage src="assets/aeonNFT_b.png" alt="aeonNFT_b" />
          <Link>Mint Survival NFT from here</Link>
        </WawaBlock>

        <WalletProvider>
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
        </WalletProvider>
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
