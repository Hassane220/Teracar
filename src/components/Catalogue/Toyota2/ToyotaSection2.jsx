import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ToyotaSection2.css';
import tmLogo from '../../../assets/images/TM_catalogue.png';
import toyotaLogo from '../../../assets/images/toyota/toyota.png';
import teracarMotors from '../../../assets/images/Teracar_motors.png';
import landcruiser79 from '../../../assets/images/toyota2/landcruiser79.png';
import pradoFirst from '../../../assets/images/toyota2/prado_first_edition.png';
import pradoLimited from '../../../assets/images/toyota2/prado_limited.png';
import hilux from '../../../assets/images/toyota2/hilux.png';
import hiace from '../../../assets/images/toyota2/hiace.png';
import coaster from '../../../assets/images/toyota2/coaster.png';
import urbancruiser from '../../../assets/images/toyota2/urbancruiser.png';

const SpecTable = ({ specs }) => (
	<div className="specs">
		{specs.map((s, i) => (
			<div key={i} className="spec-row">
				<span className="label">{s.label}</span>
				<span className="value">{s.value}</span>
			</div>
		))}
	</div>
);

const VehicleCard = ({ id, title, image, specs }) => {
	const navigate = useNavigate();
	return (
		<div
			className="card"
			style={{ cursor: 'pointer' }}
			tabIndex={0}
			role="button"
			onClick={() => navigate(`/cars/${id}`)}
			onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/cars/${id}`)}
		>
			<h3>{title}</h3>
			<div className="image-box">
				<img src={image} alt={title} className="zoomable-image" />
			</div>
			<SpecTable specs={specs} />
		</div>
	);
};

const ToyotaSection2 = () => {
	const navigate = useNavigate();
	return (
		<section className="toyota2">
			<div className="catalogue-header">
				<img src={tmLogo} alt="TM Catalogue" />
				<img src={toyotaLogo} alt="Toyota" />
			</div>
			{/* HILUX style Palisade */}
			<div
				className="explorer card toyota2-explorer"
				style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '40px', marginTop: '20px' }}
				tabIndex={0}
				role="button"
				onClick={() => navigate(`/cars/53`)}
				onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/cars/53`)}
			>
				<div className="image-box">
					<img src={hilux} alt="HILUX" className="zoomable-image" />
				</div>
				<div className="explorer-info">
					<h1>HILUX</h1>
					<SpecTable specs={[
						{ label: 'MOTORISATION', value: '4 CYLINDRES 2,4L' },
						{ label: 'CARBURANT', value: 'DIESEL' },
						{ label: 'PUISSANCE DIN', value: '150 ch' },
						{ label: 'ASSISES', value: '05' },
						{ label: 'PUISSANCE FISCALE', value: '10 CV' },
					]} />
					{/* Logos sous Hilux supprimés */}
				</div>
			</div>
			<div className="separator"></div>
			{/* GRID autres modèles */}
			<div className="grid">
				<VehicleCard id={50} title="LAND CRUISER 79" image={landcruiser79} specs={[
					{ label: 'MOTORISATION', value: '4 CYLINDRES 4,2L' },
					{ label: 'CARBURANT', value: 'DIESEL' },
					{ label: 'PUISSANCE DIN', value: '130 ch' },
					{ label: 'ASSISES', value: '05' },
					{ label: 'PUISSANCE FISCALE', value: '12 CV' },
				]} />
				<VehicleCard id={51} title="PRADO FIRST EDITION" image={pradoFirst} specs={[
					{ label: 'MOTORISATION', value: '4 CYLINDRES 2,8L' },
					{ label: 'CARBURANT', value: 'DIESEL' },
					{ label: 'PUISSANCE DIN', value: '204 ch' },
					{ label: 'ASSISES', value: '07' },
					{ label: 'PUISSANCE FISCALE', value: '13 CV' },
				]} />
				<VehicleCard id={52} title="PRADO LIMITED" image={pradoLimited} specs={[
					{ label: 'MOTORISATION', value: '4 CYLINDRES 2,8L' },
					{ label: 'CARBURANT', value: 'DIESEL' },
					{ label: 'PUISSANCE DIN', value: '204 ch' },
					{ label: 'ASSISES', value: '07' },
					{ label: 'PUISSANCE FISCALE', value: '13 CV' },
				]} />
				<VehicleCard id={54} title="HIACE" image={hiace} specs={[
					{ label: 'MOTORISATION', value: '4 CYLINDRES 2,5L' },
					{ label: 'CARBURANT', value: 'DIESEL' },
					{ label: 'PUISSANCE DIN', value: '102 ch' },
					{ label: 'ASSISES', value: '15' },
					{ label: 'PUISSANCE FISCALE', value: '08 CV' },
				]} />
				<VehicleCard id={55} title="COASTER" image={coaster} specs={[
					{ label: 'MOTORISATION', value: '4 CYLINDRES 4,0L' },
					{ label: 'CARBURANT', value: 'DIESEL' },
					{ label: 'PUISSANCE DIN', value: '130 ch' },
					{ label: 'ASSISES', value: '30' },
					{ label: 'PUISSANCE FISCALE', value: '15 CV' },
				]} />
				<VehicleCard id={56} title="URBAN CRUISER" image={urbancruiser} specs={[
					{ label: 'MOTORISATION', value: '4 CYLINDRES 1,5L' },
					{ label: 'CARBURANT', value: 'ESSENCE' },
					{ label: 'PUISSANCE DIN', value: '103 ch' },
					{ label: 'ASSISES', value: '05' },
					{ label: 'PUISSANCE FISCALE', value: '07 CV' },
				]} />
			</div>
			{/* Image Teracar Motors à la fin de la section */}
			<div style={{ width: '100%', textAlign: 'center', marginTop: 40 }}>
				<img src={teracarMotors} alt="Teracar Motors" style={{ maxWidth: '300px', width: '100%', height: 'auto', display: 'inline-block' }} />
			</div>
		</section>
	);
};

export default ToyotaSection2;
