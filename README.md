# Green Shadow Crop Monitoring System

Green Shadow Crop Monitoring System is a web-based application developed to manage and monitor various operations for Green Shadow (Pvt) Ltd., a mid-scale agricultural company in Sri Lanka. The system is built using Spring Boot and MySQL, providing a user-friendly platform to oversee crop, field, staff, vehicle, and equipment data.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Security and Validation](#security-and-validation)

## Project Overview

The application is designed to streamline the following operations for Green Shadow (Pvt) Ltd:
1. **Field Management**: Manages allocated land, GPS coordinates, extent, and assigned crops and staff.
2. **Crop Management**: Oversees crop type, growth stage, and field observations.
3. **Staff Management**: Tracks human resources, including contact details, designations, and field assignments.
4. **Vehicle & Equipment Management**: Manages vehicles and equipment used in agricultural operations.
5. **Monitoring Logs**: Records observations and updates on fields and crops.
6. **User Management**: Provides secure access control and role-based authorization.

## Features

1. **User Authentication and Authorization**:
   - Role-based access control: Manager, Administrative, Scientist, and Other.
   - OAuth 2.0 for secure authentication with Spring Security.

2. **CRUD Operations**:
   - Fully implemented CRUD operations for all primary entities: Field, Crop, Staff, Vehicle, Equipment, and Monitoring Logs.

3. **Data Sorting and Filtering**:
   - Users can sort records by various criteria (Name, Designation, Vehicle Type, Land Size, etc.).

4. **Validation**:
   - Comprehensive validation on both the client and server sides to ensure data integrity.

5. **Exception Handling**:
   - Custom exception handling to manage and log application errors effectively.

6. **Password Security**:
   - Passwords are encrypted using secure hashing (e.g., BCrypt) and never stored in plain text.

7. **Logging and Messaging**:
   - Detailed logging of user actions, with user-friendly messages for a better user experience.

8. **UI/UX**:
   - Clean, intuitive, and responsive design with a focus on user experience and visual aesthetics.

## Tech Stack

- **Frontend**: HTML, CSS, CSS frameworks, JavaScript, jQuery, AJAX
- **Backend**: Spring Boot, Spring Data JPA, Spring MVC, Spring Security, Lombok, ModelMapper, Jackson
- **Database**: MySQL
- **Authentication**: JWT and OAuth 2.0 for token-based authentication

## System Architecture

This project is structured into three main layers:
1. **API Layer**: Exposes endpoints for frontend interaction.
2. **Service Layer**: Handles business logic and data transformation.
3. **Persistence Layer**: Manages data storage and retrieval using JPA.

## Database Schema

Below are the key entities and their fields.

### Field Entity
- Field Code (String, unique)
- Field Name (String)
- Location (Point, GPS coordinates)
- Extent Size (Double, in square meters)
- Crops (List of crop types)
- Staff (List of assigned staff)
- Field Images (Long text, two fields)

### Crop Entity
- Crop Code (String, unique)
- Common Name (String)
- Scientific Name (String)
- Image (Long text)
- Category (String, e.g., Cereal)
- Season (String)
- Field (Related field details)

### Staff Entity
- ID (String, unique)
- First Name (String)
- Last Name (String)
- Designation (ENUM/String)
- Gender (ENUM)
- Joined Date (Date)
- DOB (Date)
- Address (Multi-line)
- Contact No. (String)
- Email (String)
- Role (ENUM)

### Monitoring Log
- Log Code (String, unique)
- Log Date (Date)
- Observation (String)
- Observed Image (Long text)
- Relevant Field, Crop, Staff (List)

### Vehicle Entity
- Vehicle Code (String, unique)
- License Plate Number (String, unique)
- Category (String, e.g., Van)
- Fuel Type (String)
- Status (String, available or out of service)
- Assigned Staff (Assigned driver/assistant)

### Equipment Entity
- Equipment ID (String, unique)
- Name (String)
- Type (ENUM/String, e.g., Electrical, Mechanical)
- Status (ENUM/String)
- Assigned Staff and Field
