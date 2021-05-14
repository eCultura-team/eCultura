import React, { useState, useEffect } from 'react';
import { Text, Image } from 'react-native';
import placeSearchAPI from '../../services/WikiAPI/placeSearch';

const Portfolio = ({ route }) => {
  const [placeResult, setPlaceResult] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { info } = route.params;

  const getWikiPlace = async () => {
    const { title } = route.params;

    const response = await placeSearchAPI.get(
      `api.php?format=json&action=query&generator=search&gsrlimit=1&prop=extracts%7Cpageimages&pithumbsize=800&origin=*&exintro&explaintext&exsentences=10&exlimit=max&gsrsearch=${title}`,
    );
    const { pages } = response.data.query;
    const pageid = Object.keys(pages);
    const place = pages[pageid];
    setPlaceResult(place);
    setIsLoading(false);
  };

  useEffect(() => {
    getWikiPlace();
  }, []);

  return (
    <>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <Image
            source={{ uri: placeResult.thumbnail.source }}
            style={{ width: 300, height: 300 }}
          />
          <Text>{info.description}</Text>
          <Text>{info.phone}</Text>
          <Text>{info.site}</Text>
        </>
      )}
    </>
  );
};

export default Portfolio;
