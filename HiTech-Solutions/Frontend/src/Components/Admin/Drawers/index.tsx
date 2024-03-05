import './style.css';

import {
    CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu,
    CDBSidebarMenuItem
} from 'cdbreact';
import React, { startTransition, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

import NavBar from '../../Navbar/index';
import FormulaireTest from '../../Teacher/index';
import Admin from '../CreateTrainings/index';
import CreatingTroubleshooting from '../CreateTroubleshootings';

interface DashboardSidebarProps {
	role: "admin" | "teacher";
}
const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
	const [isMembersOpen, setIsMembersOpen] = useState(false);
	const [isServicesOpen, setIsServicesOpen] = useState(false);
	const [isManTestOpen, setIsManTestOpen] = useState(false);
	const [displayFormation, setDisplayFormation] = useState(false);
	const [displayTest, setDisplayTest] = useState(false);
	const [displayTroubleshooting, setDisplayTroubleshooting] = useState(false);

	const toogleFormation = () => {
		console.log(displayFormation);
		startTransition(() => {
			setDisplayFormation(true);
			setDisplayTroubleshooting(false);
			setDisplayTest(false);
		});
	};
	const toogleTest = () => {
		console.log(displayTest);
		startTransition(() => {
			setDisplayFormation(false);
			setDisplayTroubleshooting(false);
			setDisplayTest(true);
		});
	};

	const toogleTroubleshooting = () => {
		console.log(displayFormation);
		startTransition(() => {
			setDisplayFormation(false);
			setDisplayTroubleshooting(true);
			setDisplayTest(false);
		});
	};

	const toggleMembers = () => {
		setIsMembersOpen(!isMembersOpen);
	};

	const toggleServices = () => {
		setIsServicesOpen(!isServicesOpen);
	};

	const toggleManTest = () => {
		setIsManTestOpen(!isManTestOpen);
	};
	return (
		<div style={{ overflow: "hidden" }}>
			<NavBar />
			<Row>
				<Col xs={12} md={2}>
					<div
						style={{
							height: "100vh",
							overflow: "hidden",
						}}
					>
						<CDBSidebar
							textColor="#fff"
							backgroundColor=" #1f3842e6"
							className={""}
							breakpoint={0}
							toggled={false}
							minWidth={""}
							maxWidth={""}
						>
							<div
								style={{
									paddingTop: "60px",
									color: "#40b9af",
								}}
							>
								<CDBSidebarHeader>
									Dashboard HiTech
								</CDBSidebarHeader>
							</div>

							<CDBSidebarContent className="sidebar-content">
								<CDBSidebarMenu>
									<div
										style={{
											overflow: "auto",
											maxWidth: "600px",
										}}
									>
										{role === "admin" && (
											<>
												<div className="members">
													<div
														onClick={toggleMembers}
													>
														<CDBSidebarMenuItem
															icon="user"
															className="hoverColor"
														>
															Members{" "}
															<span className="arrow">
																{isMembersOpen ? (
																	<RiArrowDropDownLine />
																) : (
																	<RiArrowDropUpLine />
																)}
															</span>
														</CDBSidebarMenuItem>
													</div>

													{isMembersOpen && (
														<div
															className="sub-menu"
															style={{
																display: "flex",
																flexDirection:
																	"column",
																paddingLeft:
																	"30px",
															}}
														>
															<CDBSidebarMenuItem className="hoverColor1">
																Professeurs
															</CDBSidebarMenuItem>
															<CDBSidebarMenuItem className="hoverColor1">
																Etudiants
															</CDBSidebarMenuItem>
														</div>
													)}
												</div>
												<div className="services">
													<div
														onClick={toggleServices}
													>
														<CDBSidebarMenuItem
															icon="cogs"
															className="hoverColor"
														>
															Services{" "}
															<span className="arrow">
																{isServicesOpen ? (
																	<RiArrowDropDownLine />
																) : (
																	<RiArrowDropUpLine />
																)}
															</span>
														</CDBSidebarMenuItem>
													</div>

													{isServicesOpen && (
														<div
															className="sub-menu"
															style={{
																display: "flex",
																flexDirection:
																	"column",
																paddingLeft:
																	"30px",
															}}
														>
															<div
																onClick={
																	toogleFormation
																}
															>
																<CDBSidebarMenuItem className="hoverColor1">
																	Formations
																</CDBSidebarMenuItem>
															</div>
															<div
																onClick={
																	toogleTroubleshooting
																}
															>
																<CDBSidebarMenuItem className="hoverColor1">
																	Dépannages
																</CDBSidebarMenuItem>
															</div>
														</div>
													)}
												</div>

												<CDBSidebarMenuItem
													icon="envelope"
													className="hoverColor"
												>
													Messages
												</CDBSidebarMenuItem>
											</>
										)}
									</div>
									<div
										style={{
											overflow: "auto",
											maxHeight: "450px",
											scrollbarWidth: "thin",
											scrollbarColor: "#888 #314353",
										}}
									>
										{role === "teacher" && (
											<>
												<div className="members">
													<div>
														<CDBSidebarMenuItem
															icon="user"
															className="hoverColor"
														>
															Students{" "}
														</CDBSidebarMenuItem>
													</div>
												</div>
												<div className="services">
													<div
														onClick={toggleManTest}
													>
														<CDBSidebarMenuItem
															icon="cogs"
															className="hoverColor"
														>
															Test manager{" "}
															<span className="arrow">
																{isManTestOpen ? (
																	<RiArrowDropDownLine />
																) : (
																	<RiArrowDropUpLine />
																)}
															</span>
														</CDBSidebarMenuItem>
													</div>

													{isManTestOpen && (
														<div
															className="sub-menu"
															style={{
																display: "flex",
																flexDirection:
																	"column",
																paddingLeft:
																	"30px",
															}}
														>
															<div
																onClick={
																	toogleTest
																}
															>
																<CDBSidebarMenuItem className="hoverColor1">
																	Course 1
																</CDBSidebarMenuItem>
															</div>
															<div>
																<CDBSidebarMenuItem className="hoverColor1">
																	Course 2
																</CDBSidebarMenuItem>
															</div>
															<div>
																<CDBSidebarMenuItem className="hoverColor1">
																	Course 3
																</CDBSidebarMenuItem>
															</div>
														</div>
													)}
												</div>

												<CDBSidebarMenuItem
													icon="envelope"
													className="hoverColor"
												>
													Messages
												</CDBSidebarMenuItem>
											</>
										)}
									</div>
								</CDBSidebarMenu>
							</CDBSidebarContent>
							<div
								style={{
									textAlign: "center",
									paddingBottom: "25px",
								}}
							>
								<CDBSidebarFooter className="drawerFooter">
									HiTech-Solutions
								</CDBSidebarFooter>
							</div>
						</CDBSidebar>
					</div>
				</Col>
				{displayFormation && <Admin />}
				{displayTest && <FormulaireTest />}
				{displayTroubleshooting && <CreatingTroubleshooting />}
			</Row>
		</div>
	);
};

export default DashboardSidebar;
