import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Result {
  id: string;
  name: string;
  img: string;
}

function Root() {
  const [data, setData] = useState<Result[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=4YlGIohGrrh3UpUur3PTjA98vW97U5sx"
      );
      const result = response.data._embedded.events;
      const newData = new Array<Result>();
      result.map((res: any) => {
        newData.push({ id: res.id, name: res.name, img: res.images[0].url });
      });
      setData(newData);
    };
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <Box>
          <Grid>
            {data.map((item: Result) => (
              <Grid key={item.id}>
                <Card>
                  <CardMedia sx={{ height: 140 }} image={item.img} />
                  <CardContent>
                    <Link to={`events/${item.id}`}>
                      <Typography>{item.name}</Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Root;
