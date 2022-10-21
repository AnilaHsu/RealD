import "./filter.scss";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getNewsData, selectCnt } from "../../app/newsSlice";

export function Filter(): JSX.Element {
  const dispatch = useAppDispatch()
  const allCountry = useAppSelector((state) => (state.news.countryData))
  const countryOption = allCountry.map(item => item.name)

  const countryName = useAppSelector((state) => (state.news.countryName))
  const category = useAppSelector((state) => (state.news.category))

  return (
    <div className="filter">
      <div className="country-filter">
        <Autocomplete
          id="size-small-standard"
          size="small"
          options={countryOption}
          value={countryName}
          onChange={(event, value): void => {
            const countryName = value ? value : ""
            const country = allCountry.find((item) => item.name === countryName)
            const countryCode = country? country.code : "" 
            dispatch(selectCnt(countryName))
            dispatch(getNewsData(
              { category, country: countryCode }
            ))
          }}

          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder=" NEWS SOURCES COUNTRY"
            />
          )}
        />
      </div>
    </div>
  );
}

export default Filter;
