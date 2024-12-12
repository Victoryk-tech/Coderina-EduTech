"use client";

import React from "react";

import CustomButton from "../Home/CustomButton";

const Page = () => {
  const formInfo1 = [
    {
      title: "Contact's First Name",
      type: "text",
      required: true,
      placeholder: "Adam",
    },
    {
      title: "Contact's Last Name",
      type: "text",
      required: true,
      placeholder: "Smith",
    },
  ];
  const formInfo2 = [
    {
      title: "School Name",
      type: "text",
      required: true,
      placeholder: "International School",
    },
    {
      title: "Email Address",
      type: "email",
      required: true,
      placeholder: "adamsmith@coderina.com",
    },
    {
      title: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "080 000 0000",
    },
    {
      title: "Address",
      type: "text",
      required: true,
      placeholder: "Where you live",
    },
  ];

  const formInfo3 = [
    {
      title: "Link to Website or Prototype (optional)",
      type: "text",
      required: false,
      placeholder: "Add URL",
    },
    {
      title: "Link to Documents (optional)",
      type: "text",
      required: false,
      placeholder: "Add URL",
    },
  ];

  const formDrop = [
    {
      title: "State",
      placeholder: "Abia State",
    },
    {
      title: "How did you hear about us?",
      placeholder: "Facebook",
    },
  ];

  return (
    <div className="w-full font-Geist px-2 md:px-4 lg:px-20 py-8">
      <div>
        <div className="grid md:grid-cols-2 items-start justify-between w-full md:space-x-28">
          <div>
            <h4 className="font-bold lg:text-[32px] lg:leading-[42px]">
              Register for the Coderina® University Challenge (COUCH)
            </h4>
            <p className="font-normal text-[16px] leading-7">
              Fill the form to register
            </p>
          </div>
          <div>
            <form className="bg-[#FDEFD9] p-6">
              {formInfo1.map((info, i) => (
                <div key={i} className="mb-[2rem] space-y-2">
                  <p className="font-normal text-[14px] leading-5">
                    {info.title}
                  </p>
                  <input
                    type={info.type}
                    placeholder={info.placeholder}
                    required={info.required}
                    className="rounded-lg p-1 placeholder:text-[14px] w-full outline-none "
                  />
                </div>
              ))}
              <fieldset
                name="radio-buttons-group"
                className="font-medium text-[14px] mb-2 "
              >
                <label>Gender</label>

                <div className="flex flex-col items-start justify-start space-y-2">
                  <div className="flex items-center justify-center space-x-2 ">
                    <input
                      type="radio"
                      id="male"
                      name="male"
                      value="male"
                      defaultChecked
                      label="Male"
                    />
                    <label>Male</label>
                  </div>

                  <div className="flex items-center justify-center space-x-2 ">
                    <input
                      type="radio"
                      id="Female"
                      name="Female"
                      value="female"
                      label="Female"
                    />
                    <label>Female</label>
                  </div>

                  <div className="flex items-center justify-center space-x-2 ">
                    <input
                      type="radio"
                      id="Other"
                      name="Other"
                      value="other"
                      label="Other"
                    />
                    <label>Other</label>
                  </div>
                </div>
              </fieldset>
              {formInfo2.map((info, index) => (
                <div className="mb-[2rem] space-y-2" key={index}>
                  <p className="font-normal text-[14px] leading-5">
                    {info.title}
                  </p>
                  <input
                    type={info.type}
                    placeholder={info.placeholder}
                    required={info.required}
                    className="rounded-lg p-1 placeholder:text-[14px] w-full outline-none"
                  />
                </div>
              ))}
              {formDrop.map((info, indexin) => (
                <div key={indexin} className="mb-[2rem] space-y-2">
                  <p className="font-normal text-[14px] leading-5">
                    {info.title}
                  </p>
                  <select
                    placeholder={info.placeholder}
                    className="rounded-lg p-1 placeholder:text-[14px] w-full"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Libya">Libya</option>
                  </select>
                </div>
              ))}
              <div className="mb-[2rem pt-3">
                <p>Idea Name</p>
                <input
                  type="text"
                  placeholder="What's your idea?"
                  required
                  className="rounded-lg p-1 placeholder:text-[14px] w-full outline-none"
                />
              </div>
              <div className="mb-[2rem] py-4">
                <p>Idea Description</p>
                <textarea
                  placeholder="What's your idea about?"
                  required
                  rows={4}
                  className="w-full p-2 placeholder:text-[14px]"
                />
              </div>
              {formInfo3.map((info, indo) => (
                <div key={indo} className="mb-[2rem] space-y-2">
                  <p className="font-normal text-[14px] leading-5">
                    {info.title}
                  </p>
                  <input
                    type={info.type}
                    placeholder={info.placeholder}
                    required={info.required}
                    className="rounded-lg p-1 placeholder:text-[14px] w-full outline-none"
                  />
                </div>
              ))}
              <div className="flex items-end">
                <CustomButton isLarge>Register</CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
