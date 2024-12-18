"use client";
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Tooltip,
  Upload,
  Radio,
} from "antd";
import Timetable from "@/app/components/timetable";
import { motion } from "framer-motion";
import { CiImport } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { DEPARTMENTS_OPTIONS } from "@/info";
import { createRoom } from "@/lib/actions/room";
import { toast } from "sonner";
import { statusCodes } from "@/app/types/statusCodes";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeslots = [
  "9:00-10:00",
  "10:00-11:00",
  "11:30-12:30",
  "12:30-1:30",
  "2:30-3:30",
  "3:30-4:30",
];

const AddRoomForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [buttonStatus, setButtonStatus] = useState(
    weekdays.map(() => timeslots.map(() => "Free"))
  );

  function clearFields() {
    form.setFieldValue('className', "");
    form.setFieldValue('lab', "");
    form.setFieldValue('department', "");
    setButtonStatus(weekdays.map(() => timeslots.map(() => "Free")));
  }

  function addClassRoom() {
    const className = form.getFieldValue('className');
    const lab = form.getFieldValue('lab')
    const dept = form.getFieldValue('department')
    // lab -> 1 is Yes 2 is No

    const res = createRoom(localStorage.getItem('token') || "", className, lab == 1, buttonStatus, dept).then((res) => {
      const statusCode = res.status;

      switch (statusCode) {
        case statusCodes.CREATED:
          toast.success("Added room successfully !!");
          clearFields();
          break;
        case statusCodes.BAD_REQUEST:
          toast.error("You are not authorized");
          clearFields();
          break;
        case statusCodes.INTERNAL_SERVER_ERROR:
          toast.error("Server error");
          break;
      }
    })

    toast.promise(res, {
      loading: "Adding room ...."
    })
  }

  return (
    <div className="text-xl font-bold text-[#171A1F] pl-8 py-6 h-screen overflow-y-scroll">
      <div className="flex px-2 items-center justify-between text-[#636AE8FF] font-inter text-xl text-bold">
        <div
          onClick={() => {
            router.push("/dashboard/rooms");
          }}
          className="flex text-base w-fit cursor-pointer space-x-2"
        >
          <h1>&#8592;</h1>
          <h1>Back</h1>
        </div>
        <Upload>
          <Button
            icon={<CiImport />}
            className="text-[#636AE8FF] border-[#636AE8FF] "
          >
            Import
          </Button>
        </Upload>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="flex justify-left items-center mt-12 ml-4"
      >
        <Form {...formItemLayout} form={form} layout="vertical" requiredMark>
          <Form.Item name="className" label="Classroom Name" required>
            <Input placeholder="Name" className="font-inter font-normal" />
          </Form.Item>
          <Form.Item name="lab" label="Is it a Lab?" required>
            <Radio.Group>
              <Radio value={1}>Yes</Radio>
              <Radio value={2} className="ml-4 color-[#636AE8FF]">
                No
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Department" name="department">
            <Select options={DEPARTMENTS_OPTIONS} className="font-inter font-normal" />
          </Form.Item>
          <label className="flex items-center">
            <span>Schedule</span>
            <Tooltip title="Click on the timeslots where to the teacher is busy to set them to busy">
              <IoIosInformationCircleOutline className="ml-2 text-[#636AE8FF]" />
            </Tooltip>
          </label>
          <div className="flex justify-left">
            <Timetable
              buttonStatus={buttonStatus}
              setButtonStatus={setButtonStatus}
            />
          </div>
          <div className="flex space-x-4 justify-end w-[55vm]">
            <Form.Item>
              <Button className="border-[#636AE8FF] text-[#636AE8FF] w-[75px] h-[32px]">
                Clear
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={addClassRoom}
                className="bg-[#636AE8FF] text-[#FFFFFF] w-[75px] h-[32px]"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default AddRoomForm;
