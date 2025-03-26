import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// Fetch Schools
export async function getSchools(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("schools").select("*");

  if (error) {
    console.error("Error fetching Schools:", error);
    return null;
  }

  return data;
}

// Add School
export async function addNewSchool(token, _, schoolData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${schoolData.name}`;

  const { error: storageError } = await supabase.storage
    .from("school-logo")
    .upload(fileName, schoolData.logo);

  if (storageError) throw new Error("Error uploading School Logo");

  const logo_url = `${supabaseUrl}/storage/v1/object/public/school-logo/${fileName}`;

  const { data, error } = await supabase
    .from("schools")
    .insert([
      {
        name: schoolData.name,
        logo_url: logo_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Schools");
  }

  return data;
}
