import mongoose from "mongoose";
import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createService = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    throw new ApiError(400, "All fields are required!");
  }

  const service = await Service.create({
    name,
    description,
    price,
  });

  if (!service) {
    throw new ApiError(500, "Something went wrong while creating service.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, service, "Service created successfully!"));
});

const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();

  if (!services || services.length === 0) {
    throw new ApiError(404, "Services not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, services, "All services fetched successfully!"));
});

const updateServiceById = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, price } = req.body;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new ApiError(400, "Invalid Service Id!");
  }

  if (!name || !description || !price) {
    throw new ApiError(400, "All fields are required!");
  }

  const updatedService = await Service.findByIdAndUpdate(
    serviceId,
    {
      $set: {
        name,
        description,
        price,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedService) {
    throw new ApiError(404, "Service not found!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedService, "Service updated successfully!")
    );
});

const deleteServiceById = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new ApiError(400, "Invalid Service Id!");
  }

  const deletedService = await Service.findByIdAndDelete(serviceId);

  if (!deletedService) {
    throw new ApiError(404, "Service not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Service deleted successfully!"));
});

export { createService, getAllServices, updateServiceById, deleteServiceById };
