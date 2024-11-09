import { Stack } from "@chakra-ui/react";
import ApplicationCard from "./ApplicationCard";
import EmptyList from "./EmptyList";
import { useGetApplications } from "../../../apis/ApplicationApis/ApplicationApis.service";
import { IApplicationApisResponse } from "../../../apis/ApplicationApis/ApplicationApis.types";

const ApplicationsList = () => {
  const { data } = useGetApplications();

  const applications: IApplicationApisResponse[] | undefined = data?.data;

  if (applications?.length === 0) return <EmptyList />;

  return (
    <Stack spacing={4} pb={10}>
      {applications?.map((item) => (
        <ApplicationCard
          key={item.id}
          fio={item.fio}
          phone_number={item.phone_number}
          id={item.id}
          status={item.status}
          created_at={item.created_at}
        />
      ))}
    </Stack>
  );
};

export default ApplicationsList;
