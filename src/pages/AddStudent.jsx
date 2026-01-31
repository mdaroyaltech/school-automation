import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const AddStudent = ({ user, setUser }) => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    studentType: "Day Scholar",
    gender: "",
    relation: "Father",
    medicalYes: "No",
    scholarship: "No",
    studentStatus: "Active",
    whatsappEnabled: "Yes",
    loginEnabled: "Yes",
    academicYear: "2025-26",
    admissionDate: today,
  });

  const [preview, setPreview] = useState(null);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  /* AUTO AGE CALC */
  useEffect(() => {
    if (!form.dob) return;
    const age =
      new Date().getFullYear() - new Date(form.dob).getFullYear();
    setForm((f) => ({ ...f, age }));
  }, [form.dob]);

  const submit = () => {
    console.log("FINAL STUDENT DATA:", {
      ...form,
      createdBy: user?.email,
      createdAt: new Date().toISOString(),
    });
    alert("Student saved (demo)");
  };

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PHASE 1 ================= */}
      <Section title="1. Student Basic Information">
        <Grid>
          <ImageUpload preview={preview} onChange={handleImage} />
          <Input name="admissionNo" label="Admission Number" onChange={handleChange} />
          <Input name="rollNo" label="Roll Number" onChange={handleChange} />
          <Input name="name" label="Student Full Name" onChange={handleChange} />
          <Select name="gender" label="Gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
          <Input type="date" name="dob" label="Date of Birth" onChange={handleChange} />
          <Input name="age" label="Age" value={form.age || ""} disabled />
          <Select
            name="class"
            label="Class"
            onChange={handleChange}
            options={[
              "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th",
              "6th", "7th", "8th", "9th", "10th",
              "11th", "12th"
            ]}
          />
          <Select
            name="section"
            label="Section"
            onChange={handleChange}
            options={["A","B"]}
            />
          <Select name="studentType" label="Student Type" value={form.studentType} onChange={handleChange} options={["Day Scholar", "Hostel"]} />
        </Grid>
      </Section>

      {/* ================= PHASE 2 ================= */}
      <Section title="2. Parent / Guardian Details">
        <Grid>
          <Input name="fatherName" label="Father Name" onChange={handleChange} />
          <Input name="motherName" label="Mother Name" onChange={handleChange} />
          <Select name="relation" label="Primary Relation" value={form.relation} onChange={handleChange} options={["Father", "Mother", "Guardian"]} />
          <Input name="parentMobile" label="Primary Mobile (WhatsApp)" onChange={handleChange} />
          <Input name="altMobile" label="Alternate Mobile" onChange={handleChange} />
          <Input
            name="email"
            label="Email ID (Optional)"
            onChange={handleChange}
            />
        </Grid>
      </Section>

      {/* ================= PHASE 3 ================= */}
      <Section title="3. Address Details">
        <Grid>
          <Input name="house" label="House No / Street" onChange={handleChange} />
          <Input name="area" label="Area / Locality" onChange={handleChange} />
          <Input name="city" label="City" onChange={handleChange} />
          <Input name="state" label="State" onChange={handleChange} />
          <Input name="pincode" label="Pincode" onChange={handleChange} />
        </Grid>
      </Section>

     {/* ================= PHASE 4 ================= */}
{form.studentType === "Hostel" && (
  <Section title="4. Hostel Details">
    <Grid>
      <Input
        name="hostelName"
        label="Hostel Name"
        onChange={handleChange}
      />
      <Input
        name="block"
        label="Block"
        onChange={handleChange}
      />
      <Input
        name="roomNo"
        label="Room Number"
        onChange={handleChange}
      />
      <Input
        name="bedNo"
        label="Bed Number"
        onChange={handleChange}
      />
      <Input
        type="date"
        name="hostelJoin"
        label="Hostel Admission Date"
        onChange={handleChange}
      />
      <Input
        name="warden"
        label="Warden Assigned"
        onChange={handleChange}
      />
    </Grid>
  </Section>
)}

      {/* ================= PHASE 5 ================= */}
<Section
  title={
    form.studentType === "Hostel"
      ? "5. Health & Safety"
      : "4. Health & Safety"
  }
>
  <Grid>
    <Select
      name="bloodGroup"
      label="Blood Group"
      onChange={handleChange}
      options={[
        "A+","A-","B+","B-","O+","O-","AB+","AB-"
      ]}
    />

    <Select
      name="medicalYes"
      label="Medical Condition"
      value={form.medicalYes}
      onChange={handleChange}
      options={["No", "Yes"]}
    />

    {form.medicalYes === "Yes" && (
      <Input
        name="medicalNotes"
        label="Medical Notes"
        onChange={handleChange}
      />
    )}

    <Input
      name="emergency"
      label="Emergency Contact Number"
      onChange={handleChange}
    />

    <Input
      name="doctor"
      label="Doctor / Hospital"
      onChange={handleChange}
    />
  </Grid>
</Section>

{/* ================= PHASE 6 ================= */}
<Section
  title={
    form.studentType === "Hostel"
      ? "6. Fees & Academic Meta"
      : "5. Fees & Academic Meta"
  }
>
  <Grid>
    <Input
      name="academicYear"
      label="Academic Year"
      value={form.academicYear}
      onChange={handleChange}
    />

    <Input
      type="date"
      name="admissionDate"
      label="Admission Date"
      value={form.admissionDate}
      onChange={handleChange}
    />

    <Input
      name="feeCategory"
      label="Fee Category"
      onChange={handleChange}
    />

    <Select
      name="scholarship"
      label="Scholarship / Discount"
      value={form.scholarship}
      onChange={handleChange}
      options={["No", "Yes"]}
    />
  </Grid>
</Section>


      {/* ================= PHASE 7 (HIDDEN) ================= */}
      <input type="hidden" value={form.studentStatus} />
      <input type="hidden" value={form.whatsappEnabled} />
      <input type="hidden" value={form.loginEnabled} />

      {/* ================= ACTION ================= */}
      <div className="flex justify-end mt-10">
        <button
          onClick={submit}
          className="px-10 py-3 rounded-xl font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Save Student
        </button>
      </div>
    </DashboardLayout>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Header = () => (
  <div
    className="mb-10 rounded-3xl p-6 shadow"
    style={{
      background: "linear-gradient(135deg, var(--bg-card), var(--bg-page))",
      border: "1px solid var(--border-card)",
    }}
  >
    <h1 className="text-3xl font-bold text-[color:var(--text-primary)]">
      Add Student
    </h1>
    <p className="text-sm mt-1 text-[color:var(--text-secondary)]">
      Complete student onboarding (All modules)
    </p>
  </div>
);

const Section = ({ title, children }) => (
  <div
    className="mb-10 p-6 rounded-2xl shadow"
    style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-card)",
    }}
  >
    <h2 className="text-lg font-semibold mb-6 text-[color:var(--text-primary)]">
      {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-3 gap-6">{children}</div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-semibold text-[color:var(--text-secondary)]">
      {label}
    </label>
    <input
      {...props}
      className="mt-1 w-full rounded-xl px-4 py-2 outline-none"
      style={{
        background: "var(--bg-page)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-default)",
      }}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-semibold text-[color:var(--text-secondary)]">
      {label}
    </label>
    <select
      {...props}
      className="mt-1 w-full rounded-xl px-4 py-2 outline-none"
      style={{
        background: "var(--bg-page)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-default)",
      }}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const ImageUpload = ({ preview, onChange }) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className="h-32 w-32 rounded-full overflow-hidden flex items-center justify-center"
      style={{
        background: "var(--bg-page)",
        border: "2px dashed var(--border-card)",
      }}
    >
      {preview ? (
        <img src={preview} alt="Student" className="h-full w-full object-cover" />
      ) : (
        <span className="text-sm text-[color:var(--text-muted)]">No Photo</span>
      )}
    </div>
    <label
      className="text-sm font-semibold cursor-pointer"
      style={{ color: "var(--accent)" }}
    >
      Upload Photo
      <input type="file" hidden accept="image/*" onChange={onChange} />
    </label>
  </div>
);

export default AddStudent;
