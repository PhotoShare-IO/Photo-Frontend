import { useMemo } from "react";
import { useDebounce } from "./useDebounce";

type Tuple<T> = [T[], string];
type KeyOfOrNever<T extends any[]> = T extends string[] ? never : keyof T[0];

interface ResultStruct<T> extends Tuple<T> {
  result: T[];
  search: string;
}

// const isObject = (obj: any) => obj != null && obj.constructor.name === "Object";

export const useSearch = <T extends any[]>(
  data: T,
  search: string,
  searchable?: KeyOfOrNever<T>,
) => {
  const debounced = useDebounce(search, 3000);

  const result = useMemo(() => {
    const regex = new RegExp(`^${search}`, "i");
    let filtered;
    if (search) {
      filtered = data?.filter((item) => {
        return regex.test(searchable ? item[searchable] : item);
      });
    } else {
      filtered = data;
    }
    const result =
      filtered.length > 0
        ? filtered
        : [searchable ? { [searchable]: "No results" } : "No results"];
    const resultStruct = [result, search] as ResultStruct<T[number]>;
    resultStruct.result = result;
    resultStruct.search = search;
    return resultStruct;
  }, [debounced, data]);

  return result;
};
