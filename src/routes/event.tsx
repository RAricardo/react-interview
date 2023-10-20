import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Result {
  id: string;
  name: string;
  img: string;
}

function Event() {
  const { id } = useParams();
  const [data, setData] = useState<Result>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=4YlGIohGrrh3UpUur3PTjA98vW97U5sx`
        );
        const result = response.data;
        setData({
          name: result.name,
          id: result.id,
          img: result.images[0].url,
        });
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);

  if (data === undefined) return;

  return (
    <>
      <Container>
        <Box>
          <Grid>
            <Grid key={data.id}>
              <Card>
                <CardMedia sx={{ height: 140 }} image={data.img} />
                <CardContent>
                  <Typography>{data.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Event;
